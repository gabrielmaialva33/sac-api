import { inject, injectable } from 'tsyringe';
import { endOfHour, startOfHour } from 'date-fns';
import { SetGranularity } from '@modules/sac/utils';

import { ICount } from '@modules/sac/interfaces/icounts.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';

@injectable()
export class IndexCountService {
  constructor(
    @inject('CountsRepository')
    private countsRepository: ICount.Repository
  ) {}

  public async execute(
    params: ICount.DTO.Index
  ): Promise<PaginationAwareObject> {
    try {
      const data: ICount.DTO.Index = params;

      const { start_date, end_date, granularity, issue_id }: ICount.DTO.Index =
        {
          start_date: data.start_date
            ? new Date(data.start_date)
            : new Date(startOfHour(new Date())),
          end_date: data.end_date
            ? new Date(data.end_date)
            : new Date(endOfHour(new Date())),
          granularity: data.granularity
            ? data.granularity
            : SetGranularity(
                new Date(data.start_date),
                new Date(data.end_date)
              ),
          issue_id: data.issue_id
        };

      return this.countsRepository.index({
        start_date,
        end_date,
        granularity,
        issue_id
      });
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
