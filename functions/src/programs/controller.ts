import { Request, Response} from 'express';
import { create, read } from './model';
import * as serializer from './serializer'

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
    return res.status(200).send(serializer.programs(userId, result));
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

/* Create a new program for userId user
 *
 * Headers:
 *   'Content-type', 'application/json'
 *   'Authorization', 'Bearer idToken'
 *
 * Request:
 * {
 *   program: {
 *     name: string,
 *     description: string,
 *     slug: string,
 *     courses: [{
 *       name: string,
 *       description: string,
 *       slug: string,
 *       url: string,
 *       progress: "TODO"|"DOING"|"DONE"
 *     }]
 *   }
 * }
 *
 *
 * Response:
 * {
 *   user: {
 *    id: string,
 *   },
 *   program: {
 *    id: string
 *    name: string,
 *    description?: string,
 *    slug: string,
 *    courses: Course[],
 *    createdAt: Date,
 *    updatedAt: Date
 *    link: string
 *   }
 * }
*/
const add = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { program } = req.body
    if (!program)
      return res.status(400).send({message: 'Missing fields'})

    const result = await create(userId, program)
    return res.status(201).send(serializer.program(userId, result))
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

const show = (req: Request, res: Response) => res.send(req.params.pid);

const patch = (req: Request, res: Response) => res.send(req.params.pid);

const remove = (req: Request, res: Response) => res.send(req.params.pid);

export {
  list,
  add,
  show,
  patch,
  remove
};
