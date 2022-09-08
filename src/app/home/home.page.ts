import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  AnimationController,
  createAnimation,
  ToastController,
} from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// import Swiper core and required modules
import SwiperCore, { EffectCreative, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([EffectCreative, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('accesspanel') accesspanel: ElementRef;
  accessCodeMessenger: Subject<string> = new Subject();
  accessCode = '';
  access = false;
  creativeEffect: any = {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  };

  paginateOptions: any = {
    clickable: true,
  };
  constructor(
    private animations: AnimationController,
    private toast: ToastController,
    private http: HttpClient
  ) {
    this.accessCodeMessenger
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.validate();
      });
  }

  async validate() {
    this.http
      .post('https://peazinapod.org/api/access', {
        input: this.accessCode,
      })
      .subscribe(
        (res: any) => {
          if (res.accessGranted) {
            const animation = this.animations
              .create()
              .addElement(this.accesspanel.nativeElement)
              .duration(500)
              .fromTo('opacity', '1', '0')
              .onFinish(async () => {
                this.access = true;
                (
                  await this.toast.create({
                    message: 'Coming up',
                    duration: 2000,
                    translucent: true,
                    cssClass: 'access-toast',
                  })
                ).present();
              });
            animation.play();
          } else {
            this.access = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
