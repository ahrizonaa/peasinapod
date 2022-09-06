import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  try {
    const result = {
      input: req.body.input,
      accessGranted: String(req.body.input) === '4115',
    };

    res.status(200).send(result);
  } catch (exception) {
    res.status(500).send(exception);
  }
};
