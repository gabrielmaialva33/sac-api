import { Router } from 'express';

import sacsRouter from '@modules/sac/routes/sac.routes';
import issueRouter from '@modules/sac/routes/issue.routes';

const routes = Router();

routes.use('/sacs', sacsRouter);
routes.use('/issues', issueRouter);

export default routes;
