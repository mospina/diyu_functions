import { Request, Response} from 'express';
import { create, readAll, read, update, destroy } from './model';
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
    const result = await readAll(userId)
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

/* Get program with id :pid
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
 *    createdAt: Date,
 *    updatedAt: Date
 *    link: string
 *   }
 * }
 */
const show = async (req: Request, res: Response) => {
  try {
    const { userId, pid } = req.params
    const result = await read(userId, pid)
    return res.status(200).send(serializer.program(userId, result))
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

/* Update programId program for userId user
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
 *    createdAt: Date,
 *    updatedAt: Date
 *    link: string
 *   }
 * }
*/
const patch = async (req: Request, res: Response) => {
  try {
    const { userId, pid } = req.params
    const { program } = req.body
    if (!program)
      return res.status(400).send({message: 'Missing fields'})

    const result = await update(userId, pid, program)
    return res.status(200).send(serializer.program(userId, result))
  } catch(error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

const remove = async (req: Request, res: Response) => { 
  try {
    const { userId, pid } = req.params
    await destroy(userId, pid)
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
