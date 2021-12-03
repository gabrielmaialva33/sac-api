import { Router } from 'express';

import IssuesController from '@modules/sac/controllers/issues.controller';

const issueRouter = Router();

issueRouter.get('/', new IssuesController().index);
issueRouter.post('/', new IssuesController().store);

export default issueRouter;
