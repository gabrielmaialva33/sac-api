import { Router } from 'express';

import SacsController from '@modules/sac/controllers/sacs.controller';

const sacsRouter = Router();

sacsRouter.get('/', new SacsController().index);
sacsRouter.post('/', new SacsController().store);

export default sacsRouter;
