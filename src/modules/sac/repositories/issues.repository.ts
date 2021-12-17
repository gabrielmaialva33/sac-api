import { EntityManager, getManager, getRepository, Repository } from 'typeorm';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import Issue from '@modules/sac/entities/issue';

export default class IssuesRepository implements IIssue.Repository {
  private ormRepository: Repository<Issue>;
  private ormManager: EntityManager;

  constructor() {
    this.ormRepository = getRepository(Issue);
    this.ormManager = getManager();
  }

  public async index(params: IIssue.DTO.Index): Promise<PaginationAwareObject> {
    const { sac_id } = params;

    return await this.ormRepository
      .createQueryBuilder('issues')
      .where('issue.sac_id = :sac_id and issue.is_deleted = :is_deleted', {
        sac_id: String(sac_id),
        is_deleted: false
      })
      .leftJoin('issue.counts', 'count', 'count.is_deleted is false')
      .loadRelationCountAndMap(
        'issue.counts_amount',
        'issue.counts',
        'count',
        (db) => {
          return db.where('count.is_deleted is :is_deleted', {
            is_deleted: false
          });
        }
      )
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
