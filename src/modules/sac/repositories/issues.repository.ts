import { getRepository, Repository } from 'typeorm';

import { IIssue } from '@modules/sac/interfaces/issue.interfaces';
import Issue from '@modules/sac/entities/issue';

export default class IssuesRepository implements IIssue.Repository {
  private ormRepository: Repository<Issue>;

  constructor() {
    this.ormRepository = getRepository(Issue);
  }

  public async index(): Promise<Issue[]> {
    return this.ormRepository
      .createQueryBuilder('issues')
      .select()
      .where({ is_deleted: false })
      .getMany();
  }

  public async store(data: IIssue.DTO.Store): Promise<Issue> {
    const issue = this.ormRepository.create(data);
    return this.ormRepository.save(issue);
  }

  public async update(issue: Issue): Promise<Issue> {
    return this.ormRepository.save(issue);
  }
}
