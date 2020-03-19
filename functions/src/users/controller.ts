import { Request, Response} from 'express';
import { create, read, update, destroy } from './model';

/* Create a new user profile :id user
 *
 * Headers:
 *   'Content-type', 'application/json'
 *   'Authorization', 'Bearer idToken'
 *
 * Request:
 * {
 *   user: {
 *     profile: {
 *       name: string
 *     }
 *   }
 * }
 *
 *
 * Response:
 * {
 *   user: {
 *     id: string,
 *     profile: {
 *       name: string
 *     },
 *     account: {
 *       type: string,
 *       status: string
 *     }
 *   }
 * }
*/
const add = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { user: { profile } } = req.body
    if (!profile)
      return res.status(400).send({message: 'Missing fields'})

    const result = await create(userId, profile)
    return res.status(201).send(result)
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

/* Get user with id :id
 *
 * Response:
 * {
 *   user: {
 *    id: string,
 *    profile: {
 *      name: string
 *    },
 *    account: {
 *      type: string,
 *      status: string
 *    }
 *   }
 * }
 */
const show = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await read(userId)
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

/* Update user profile for :id user
 * 
 * Headers:
 *   'Content-type', 'application/json'
 *   'Authorization', 'Bearer idToken'
 *
 * Request:
 * {
 *   user: {
 *     profile: {
 *       name: string
 *     }
 *   }
 * }
 *
 *
 * Response:
 * {
 *   user: {
 *     id: string,
 *     profile: {
 *       name: string
 *     },
 *     account: {
 *       type: string,
 *       status: string
 *     }
 *   }
 * }
*/
const patch = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { user: { profile } } = req.body
    if (!profile)
      return res.status(400).send({message: 'Missing fields'})

    const result = await update(userId, profile)
    return res.status(200).send(result)
  } catch(error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

const remove = async (req: Request, res: Response) => { 
  try {
    const { userId } = req.params
    await destroy(userId)
    return res.status(204).send()
  } catch (error) {
    return res.status(500).send({message: `${error.code} - ${error.message}`})
  }
}

export {
  add,
  show,
  patch,
  remove
};
