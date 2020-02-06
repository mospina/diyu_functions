import * as express from 'express';
import * as programs from './controllers/programs';
import * as courses from './controllers/courses';
import { isAuthenticated, isAuthorized } from '../auth';

const router = express.Router();
router.use(express.json());
router.use(isAuthenticated, isAuthorized)

/*
 * Verb    Path            Description             Auth
 * GET    /programs 	   Lists all programs       - 
 * POST   /programs 	   Creates new program      User
 * GET    /programs/:id  Gets the :id program     - 
 * PATCH  /programs/:id  Updates the :id program  User
 * DELETE /programs/:id  Deletes the :id program  User
*/
router.get('/', programs.list);
router.post('/', programs.create);
router.get('/:pid', programs.show);
router.patch('/:pid', programs.patch);
router.delete('/:pid', programs.remove);

/*
 * Verb    Path                        Description               Auth
 * GET    /programs/:pid/courses 	    Lists all courses          - 
 * POST   /programs/:pid/courses 	    Creates new course         User
 * GET    /programs/:pid/courses/:id  Gets the :id course        - 
 * PATCH  /programs/:pid/courses/:id  Updates the :id course     User
 * DELETE /programs/:pid/courses/:id  Deletes the :id course     User
*/
router.get('/:pid/courses', courses.list);
router.post('/:pid/courses', courses.create);
router.get('/:pid/courses/:id', courses.show);
router.patch('/:pid/courses/:id', courses.patch);
router.delete('/:pid/courses/:id', courses.remove);

export { router };
