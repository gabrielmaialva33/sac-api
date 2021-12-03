import { getRepository, Repository } from 'typeorm';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import Sac from '@modules/sac/entities/sac';

export default class SacsRepository implements ISac.Repository {
  private ormRepository: Repository<Sac>;

  constructor() {
    this.ormRepository = getRepository(Sac);
  }

  public async index(): Promise<Sac[]> {
    return this.ormRepository
      .createQueryBuilder('sacs')
      .select()
      .where({ is_deleted: false })
      .getMany();
  }

  public async store(data: ISac.DTO.Store): Promise<Sac> {
    const sac = this.ormRepository.create(data);
    return this.ormRepository.save(sac);
  }

  public async update(sac: Sac): Promise<Sac> {
    return this.ormRepository.save(sac);
  }
}
