import { Request, Response} from 'express';

const show = (req: Request, res: Response) => res.status(200).send('ok');

export {
  show
};
