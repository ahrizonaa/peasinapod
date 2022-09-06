import { Component } from '@angular/core';

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
  accessCode;
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
  constructor() {}

  validate() {
    console.log(this.accessCode);
    if (this.accessCode == '4115') {
      this.access = true;
    } else {
      this.access = false;
    }
  }
}
