import { inject, injectable } from 'tsyringe';
import { startOfDay, endOfDay } from 'date-fns';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';

export interface IParams {
  end_date: string | string[] | undefined;
  granularity: string | string[] | undefined;
  start_date: string | string[] | undefined;
}

@injectable()
export class IndexSacService {
  constructor(
    @inject('SacsRepository')
    private sacsRepository: ISac.Repository
  ) {}

  public async execute(params: ISac.DTO.Index): Promise<PaginationAwareObject> {
    try {
      const data: ISac.DTO.Index = params;

      const { start_date, end_date, granularity }: ISac.DTO.Index = {
        start_date: data.start_date
          ? new Date(data.start_date)
          : startOfDay(new Date()),
        end_date: data.end_date
          ? new Date(data.end_date)
          : endOfDay(new Date()),
        granularity: data.granularity ? data.granularity : 'hour'
      };

      return this.sacsRepository.index({
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        granularity
      });
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
