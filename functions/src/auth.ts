import { Request, Response} from 'express';
import { auth } from './initializeApp';

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
    }

    return next()
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}

const isOwner = (req: Request, res: Response, next: Function) => {
  const { uid } = res.locals
  const { userId } = req.params

  if (uid === userId) {
    return next()
  }

  return res.status(401).send({ message: 'Unauthorized' });
}

export { isAuthenticated, isOwner }
