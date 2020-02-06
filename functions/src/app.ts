import * as express from 'express';
import * as cors from 'cors';
import { router } from './router';
import { router as userRouter} from './users/router';
import { router as programRouter} from './programs/router';

const app = express();
app.use(cors({origin: '*'}));

app.use('/', router);
app.use('/users', userRouter);
app.use('/programs', programRouter)

export { app };
