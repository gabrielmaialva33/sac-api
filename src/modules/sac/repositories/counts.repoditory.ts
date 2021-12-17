import { EntityManager, getManager, getRepository, Repository } from 'typeorm';

import { ICount } from '@modules/sac/interfaces/icounts.interfaces';
import Count from '@modules/sac/entities/count';

import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

export default class CountsRepository implements ICount.Repository {
  private ormRepository: Repository<Count>;
  private ormManager: EntityManager;

  constructor() {
    this.ormRepository = getRepository(Count);
    this.ormManager = getManager();
  }
  public async index(params: ICount.DTO.Index): Promise<PaginationAwareObject> {
    const { start_date, end_date, granularity, issue_id } = params;

    const query_filter = `select i "date_time", ( select count(*) from counts as c where c.issue_id = $1 and c.created_at < i + interval '1 ${granularity}' and c.created_at > i ) "count" from generate_series($2, $3, '1 ${granularity}'::interval) i;`;
    //const query_all = `select i "date_time", ( select count(*) from counts as c where c.issue_id = $1 and  i + interval '1 ${granularity}') "count" from generate_series($2, $3, '1 ${granularity}'::interval) i;`;

    return this.ormManager.query(query_filter, [
      issue_id,
      start_date,
      end_date
    ]);
  }

  public async store(data: ICount.DTO.Store): Promise<Count> {
    return this.ormRepository.save(data);
  }

  public async update(count: Count): Promise<Count> {
    return this.ormRepository.save(count);
  }
}
