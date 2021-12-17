import { getRepository, Repository } from 'typeorm';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import Sac from '@modules/sac/entities/sac';

export default class SacsRepository implements ISac.Repository {
  private ormRepository: Repository<Sac>;

  constructor() {
    this.ormRepository = getRepository(Sac);
  }

  public async index(): Promise<PaginationAwareObject> {
    return this.ormRepository
      .createQueryBuilder('sac')
      .where({ is_deleted: false })
      .leftJoinAndSelect('sac.issues', 'issue', 'issue.is_deleted is false')
      .loadRelationCountAndMap(
        'sac.issues_amount',
        'sac.issues',
        'issue',
        (db) => {
          return db.where({ is_deleted: false });
        }
      )
      .loadRelationCountAndMap(
        'issue.counts_amount',
        'issue.counts',
        'count',
        (db) => {
          return db.where({ is_deleted: false });
        }
      )
      .paginate();
  }

  public async store(data: ISac.DTO.Store): Promise<Sac> {
    const sac = this.ormRepository.create(data);
    return this.ormRepository.save(sac);
  }

  public async update(sac: Sac): Promise<Sac> {
    return this.ormRepository.save(sac);
  }
}
