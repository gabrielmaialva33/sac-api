import { inject, injectable } from 'tsyringe';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';

@injectable()
export class IndexIssueService {
  constructor(
    @inject('IssuesRepository')
    private issuesRepository: IIssue.Repository
  ) {}

  public async execute(): Promise<PaginationAwareObject> {
    try {
      return this.issuesRepository.index();
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
