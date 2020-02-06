import { Router } from 'express';
import * as root from './controller';

const router = Router();

router.get('/', root.show);

export { router };
