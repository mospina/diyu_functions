import { Request, Response} from 'express';
import { auth } from '../initializeApp';

const list = async (req: Request, res: Response) => {
  try {
    const listUsers = await auth.listUsers()
    const users = listUsers.users.map((user) => { 
      const customClaims = ( user.customClaims || { admin: false }) as {admin?: boolean}
      return {
        uid: user.uid, 
        email: user.email, 
        isAdmin: customClaims.admin,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
      }
    })
    return res.status(200).send({users})
  } catch (error) {
    return res.status(500).send({ message: `${error.code} - ${error.message}`})
  }
}

/*
 * Create request the store to create a new measurement under user.
 * user is a AppUser, the payload only provide the phoneNumber
 * measurement is a Measurement
 *
 * Authorization needs to be checked from the header
 */
const create = async (req: Request, res: Response) => {
  try {
    const { email, password, isAdmin } = req.body
    if (!email || !password) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    const { uid } = await auth.createUser({
      email,
      password
    })

    await auth.setCustomUserClaims(uid, { admin: (isAdmin ? isAdmin : false) })

    return res.status(200).send({ uid })
  } catch (error) {
    return res.status(500).send({ message: `${error.code} - ${error.message}`})
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await auth.getUser(id)
    return res.status(200).send({ user })
  } catch (error) {
    return res.status(500).send({ message: `${error.code} - ${error.message}`})
  }
}

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { password } = req.body

    if (!id || !password) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    const user = await auth.updateUser(id, { password })
    return res.status(204).send({ user })
  } catch (error) {
    return res.status(500).send({ message: `${error.code} - ${error.message}`})
  }
}

const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { isAdmin } = req.body

    if (!id || !isAdmin) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    await auth.setCustomUserClaims(id, { admin: isAdmin })
    return res.status(204).send({})
  } catch (error) {
    return res.status(500).send({ message: `${error.code} - ${error.message}`})
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await auth.deleteUser(id)
    return res.status(204).send({})
  } catch (error) {
    return res.status(500).send({ message: `${error.code} - ${error.message}`})
  }
}

export {
  list,
  create,
  show,
  remove,
  updateRole,
  updatePassword
};
