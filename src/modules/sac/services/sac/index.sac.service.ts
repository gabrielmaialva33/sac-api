import { inject, injectable } from 'tsyringe';
import { startOfDay, endOfDay } from 'date-fns';
import { ISOToDBDate } from '@modules/sac/utils';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';

@injectable()
export class IndexSacService {
  constructor(
    @inject('SacsRepository')
    private sacsRepository: ISac.Repository
  ) {}

  public async execute(params: ISac.DTO.Index): Promise<PaginationAwareObject> {
    try {
      const data: ISac.DTO.Index = params;

      const { start_date, end_date }: ISac.DTO.Index = {
        start_date: data.start_date
          ? new Date(data.start_date)
          : new Date(startOfDay(new Date())),
        end_date: data.end_date
          ? new Date(data.end_date)
          : new Date(endOfDay(new Date()))
      };

      return this.sacsRepository.index({
        start_date: ISOToDBDate(start_date),
        end_date: ISOToDBDate(end_date)
      });
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
