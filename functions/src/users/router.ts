import * as express from 'express';
import * as profiles from './controller';
import { isAuthenticated, isOwner } from '../auth';

const router = express.Router({mergeParams: true});
router.use(express.json());

/*
 * |Verb   | Path       |  Description           | Auth
 * |-------|------------|------------------------|------------
 * |POST   |/users/:id  |Creates the :id profile |User, Owner 
 * |GET    |/users/:id  |Gets the :id profile    |- 
 * |PATCH  |/users/:id  |Updates the :id profile |User, Owner
 * |DELETE |/users/:id  |Deletes the :id *user*  |User, Owner
 */
router.post('/:userId', isAuthenticated, isOwner, profiles.add);
router.get('/:userId', profiles.show);
router.patch('/:userId', isAuthenticated, isOwner, profiles.patch);
router.delete('/:userId', isAuthenticated, isOwner, profiles.remove);

export {router}

