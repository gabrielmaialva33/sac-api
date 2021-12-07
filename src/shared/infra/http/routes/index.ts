import { Router } from 'express';

import sacsRouter from '@modules/sac/routes/sac.routes';
import issueRouter from '@modules/sac/routes/issue.routes';
import countRouter from '@modules/sac/routes/count.routes';

const routes = Router();

routes.use('/sacs', sacsRouter);
routes.use('/sacs/issues', issueRouter);
routes.use('/sacs/issues/counts', countRouter);

export default routes;
