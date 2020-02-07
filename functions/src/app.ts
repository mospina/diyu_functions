import * as express from 'express';
import * as cors from 'cors';
import { router } from './router';
import { router as programs} from './programs/router';

const app = express();
app.use(cors({origin: '*'}));

app.use('/', router);
app.use('/users/:userId/programs', programs)

export { app };
