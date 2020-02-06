import * as express from 'express';
import * as users from './controller';
import { isAuthenticated, isAuthorized } from '../auth';

const router = express.Router();
router.use(express.json());
router.use(isAuthenticated, isAuthorized)

router.get('/', users.list);
router.post('/', users.create);
router.get('/:uid', users.show);

export { router };
