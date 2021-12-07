import { container } from 'tsyringe';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import SacsRepository from '@modules/sac/repositories/sacs.repository';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import IssuesRepository from '@modules/sac/repositories/issues.repository';

import { ICount } from '@modules/sac/interfaces/icounts.interfaces';
import CountsRepository from '@modules/sac/repositories/counts.repoditory';

container.registerSingleton<ISac.Repository>('SacsRepository', SacsRepository);

container.registerSingleton<IIssue.Repository>(
  'IssuesRepository',
  IssuesRepository
);

container.registerSingleton<ICount.Repository>(
  'CountsRepository',
  CountsRepository
);
