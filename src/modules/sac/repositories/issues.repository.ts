import { getRepository, Repository } from 'typeorm';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import Issue from '@modules/sac/entities/issue';
import Count from '@modules/sac/entities/count';

export default class IssuesRepository implements IIssue.Repository {
  private ormRepository: Repository<Issue>;

  constructor() {
    this.ormRepository = getRepository(Issue);
  }

  public async index(data: IIssue.DTO.Index): Promise<PaginationAwareObject> {
    const { sac_id, start_date, end_date, granularity } = data;

    const granularity_grid = this.ormRepository
      .createQueryBuilder('counts')
      .select('count(*)', 'issues_total')
      .from(Count, 'count')
      .where(
        'count.is_deleted = :is_deleted and count.created_at >= :start_date and count.created_at <= :end_date',
        {
          is_deleted: false,
          start_date,
          end_date
        }
      );

    console.log(granularity_grid);

    return this.ormRepository
      .createQueryBuilder('issue')
      .select('')
      .addSelect((db) =>
        db
          .select('count(*)', 'issues_total')
          .from(Issue, 'i')
          .where(
            'count.is_deleted = :is_deleted and count.created_at >= :start_date and count.created_at <= :end_date',
            {
              is_deleted: false,
              start_date,
              end_date
            }
          )
      )
      .where('issue.sac_id = :sac_id and issue.is_deleted = :is_deleted', {
        sac_id: String(sac_id),
        is_deleted: false
      })
      .paginate();
  }

  public async store(data: IIssue.DTO.Store): Promise<Issue> {
    const issue = this.ormRepository.create(data);
    return this.ormRepository.save(issue);
  }

  public async update(issue: Issue): Promise<Issue> {
    return this.ormRepository.save(issue);
  }
}
