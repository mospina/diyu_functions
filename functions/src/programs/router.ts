import * as express from 'express';
import * as programs from './controller';
import * as courses from './courses/controller';
import { isAuthenticated, isOwner } from '../auth';

const router = express.Router({mergeParams: true});
router.use(express.json());

/*
 * Verb    Path            Description             Auth
 * GET    /programs 	   Lists all programs       - 
 * POST   /programs 	   Creates new program      Auth, Owner
 * GET    /programs/:id  Gets the :id program     - 
 * PATCH  /programs/:id  Updates the :id program  User
 * DELETE /programs/:id  Deletes the :id program  User
*/
router.get('/', programs.list);
router.post('/', isAuthenticated, isOwner, programs.add);
router.get('/:pid', programs.show);
router.patch('/:pid', isAuthenticated, isOwner, programs.patch);
router.delete('/:pid', isAuthenticated, programs.remove);

/*
 * Verb    Path                        Description               Auth
 * GET    /programs/:pid/courses 	    Lists all courses          - 
 * POST   /programs/:pid/courses 	    Creates new course         User
 * GET    /programs/:pid/courses/:id  Gets the :id course        - 
 * PATCH  /programs/:pid/courses/:id  Updates the :id course     User
 * DELETE /programs/:pid/courses/:id  Deletes the :id course     User
*/
router.get('/:pid/courses', courses.list);
router.post('/:pid/courses', isAuthenticated, courses.create);
router.get('/:pid/courses/:id', courses.show);
router.patch('/:pid/courses/:id', isAuthenticated, courses.patch);
router.delete('/:pid/courses/:id', isAuthenticated, courses.remove);

export { router };
