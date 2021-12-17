import { inject, injectable } from 'tsyringe';
import { endOfHour, startOfHour, addHours } from 'date-fns';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';
import { ISOToDBDate } from '@modules/sac/utils';

@injectable()
export class IndexIssueService {
  constructor(
    @inject('IssuesRepository')
    private issuesRepository: IIssue.Repository
  ) {}

  public async execute(
    params: IIssue.DTO.Index
  ): Promise<PaginationAwareObject> {
    try {
      const data: IIssue.DTO.Index = params;

      const { sac_id, start_date, end_date, granularity }: IIssue.DTO.Index = {
        sac_id: data.sac_id,
        start_date: data.start_date
          ? new Date(data.start_date)
          : new Date(startOfHour(new Date())),
        end_date: data.end_date
          ? new Date(data.end_date)
          : new Date(endOfHour(new Date())),
        granularity: data.granularity ? data.granularity : 'day'
      };

      console.log({
        sac_id,
        start_date,
        end_date,
        granularity
      });

      return this.issuesRepository.index({
        sac_id,
        start_date: ISOToDBDate(start_date),
        end_date: ISOToDBDate(end_date),
        granularity
      });
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
