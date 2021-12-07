import { Router } from 'express';

import CountsController from '@modules/sac/controllers/counts.controller';

const countRouter = Router();

countRouter.get('/', new CountsController().index);
countRouter.post('/', new CountsController().store);

export default countRouter;
