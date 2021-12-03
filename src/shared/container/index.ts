import { container } from 'tsyringe';

import { Sac } from '@modules/sac/models/sac';
import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import SacsRepository from '@modules/sac/repositories/sacs.repository';

container.registerSingleton<ISac.Repository<Sac>>(
  'SacsRepository',
  SacsRepository
);
