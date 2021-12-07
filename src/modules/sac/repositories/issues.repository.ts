import { getRepository, Repository } from 'typeorm';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import Issue from '@modules/sac/entities/issue';

export default class IssuesRepository implements IIssue.Repository {
  private ormRepository: Repository<Issue>;

  constructor() {
    this.ormRepository = getRepository(Issue);
  }

  public async index(data: IIssue.DTO.Index): Promise<PaginationAwareObject> {
    const { per_page, sac_id } = data;

    return this.ormRepository
      .createQueryBuilder('issue')
      .select()
      .where({ sac_id: String(sac_id), is_deleted: false })
      .leftJoinAndSelect('issue.counts', 'count', 'count.is_deleted is false')
      .loadRelationCountAndMap('issue.total', 'issue.counts')
      .paginate(Number(per_page));
  }

  public async store(data: IIssue.DTO.Store): Promise<Issue> {
    const issue = this.ormRepository.create(data);
    return this.ormRepository.save(issue);
  }

  public async update(issue: Issue): Promise<Issue> {
    return this.ormRepository.save(issue);
  }
}
