import { Request, Response} from 'express';
import { create, readAll, read, update, destroy } from './model';
import * as serializer from './serializer'

/* Returns all courses for userId user and pid program
 *
 * Response:
 * {
 *   user: {
 *    id: string,
 *   },
 *   program: {
 *    id: string
 *    link: string
 *    courses: [{
 *      id: string,
 *      name: string,
 *      description: string,
 *      slug: string,
 *      url: string,
 *      progress: "TODO" | "DOING" | "DONE",
 *      createdAt: Date,
 *      updatedAt: Date
 *    }],
 *   }
 * }
*/
const list = async (req: Request, res: Response) => {
  try {
    const { userId, pid } = req.params
    const result = await readAll(userId, pid)
    return res.status(200).send(serializer.courses(userId, pid, result));
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

const add = async (req: Request, res: Response) => {
  try {
    const { userId, pid } = req.params
    const { course } = req.body
    if (!course)
      return res.status(400).send({message: 'Missing fields'})

    const result = await create(userId, pid, course)
    return res.status(201).send(serializer.course(userId, pid, result))
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const { userId, pid, id } = req.params
    const result = await read(userId, pid, id)
    return res.status(200).send(serializer.course(userId, pid, result))
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

const patch = async (req: Request, res: Response) => {
  try {
    const { userId, pid, id } = req.params
    const { course } = req.body
    if (!course)
      return res.status(400).send({message: 'Missing fields'})

    const result = await update(userId, pid, id, course)
    return res.status(200).send(serializer.course(userId, pid, result))
  } catch(error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
} 

const remove = async (req: Request, res: Response) => {
  try {
    const { userId, pid, id } = req.params
    await destroy(userId, pid, id)
    return res.status(204).send()
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

export {
  list,
  add,
  show,
  patch,
  remove
};
