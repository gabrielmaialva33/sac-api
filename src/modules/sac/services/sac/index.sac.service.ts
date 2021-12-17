import { inject, injectable } from 'tsyringe';
import { startOfDay, endOfDay } from 'date-fns';
import { ISOToDBDate, SetGranularity } from '@modules/sac/utils';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';

@injectable()
export class IndexSacService {
  constructor(
    @inject('SacsRepository')
    private sacsRepository: ISac.Repository
  ) {}

  public async execute(): Promise<PaginationAwareObject> {
    try {
      return this.sacsRepository.index();
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
