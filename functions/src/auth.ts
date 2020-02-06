import { Request, Response} from 'express';
import { firestore, auth } from './initializeApp';

const isSuperuser = async (email:string): Promise<boolean> => {
  const result = await firestore.collection('superusers')
    .where('email', '==', email)
    .get()

  return !result.empty
}

const isAuthenticated = async (req: Request, res: Response, next: Function) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ message: 'Unauthorized' });

  if (!authorization.startsWith('Bearer'))
    return res.status(401).send({ message: 'Unauthorized' });

  const [, token] = authorization.split(' ');
  if (!token)
    return res.status(401).send({ message: 'Unauthorized' });

  try {
    const decodedToken = await auth.verifyIdToken(token)
    res.locals = {
      ...res.locals, 
      uid: decodedToken.uid, 
      email: decodedToken.email,
      admin: decodedToken.admin
    }

    return next()
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

const isAuthorized = (req: Request, res: Response, next: Function) => {
  const { uid, email, admin } = res.locals
  const { id } = req.params

  if (id && uid === id)
    return next()

  if (isSuperuser(email) || admin)
    return next()

  return res.status(403).send()
}

export { isAuthenticated, isAuthorized }
