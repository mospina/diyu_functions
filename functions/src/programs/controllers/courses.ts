import { Request, Response} from 'express';

const list = (req: Request, res: Response) => res.send('Hello express get');

const create = (req: Request, res: Response) => res.send('Hello express post');

const show = (req: Request, res: Response) => res.send(req.params.pid);

const patch = (req: Request, res: Response) => res.send(req.params.pid);

const remove = (req: Request, res: Response) => res.send(req.params.pid);

export {
  list,
  create,
  show,
  patch,
  remove
};
