import { Request, Response} from 'express';
import { read } from './model';
import { programs } from './serializer'

/* Returns all programs for userId user
 *
 * Response:
 * {
 *   user: {
 *    id: string,
 *   },
 *   programs: [{
 *    id: string
 *    name: string,
 *    description?: string,
 *    slug: string,
 *    courses: Course[],
 *    createdAt: Date,
 *    updatedAt: Date
 *    link: string
 *   }]
 * }
*/
const list = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await read(userId)
    return res.status(200).send(programs(userId, result));
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

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
