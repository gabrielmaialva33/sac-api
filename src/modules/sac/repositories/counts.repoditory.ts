import { ICount } from '@modules/sac/interfaces/icounts.interfaces';
import Count from '@modules/sac/entities/count';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { getRepository, Repository } from 'typeorm';

export default class CountsRepository implements ICount.Repository {
  private ormRepository: Repository<Count>;

  constructor() {
    this.ormRepository = getRepository(Count);
  }

  public async index(params: ICount.DTO.Index): Promise<PaginationAwareObject> {
    const { per_page, issue_id } = params;

    return this.ormRepository
      .createQueryBuilder('counts')
      .select()
      .where({ issue_id: String(issue_id), is_deleted: false })
      .paginate(Number(per_page));
  }

  public async store(data: ICount.DTO.Store): Promise<Count> {
    return this.ormRepository.save(data);
  }

  public async update(count: Count): Promise<Count> {
    return this.ormRepository.save(count);
  }
}
