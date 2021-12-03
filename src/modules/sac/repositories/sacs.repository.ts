import { getRepository, Repository } from 'typeorm';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { Sac } from '@modules/sac/models/sac';

export default class SacsRepository implements ISac.Repository<Sac> {
  private ormRepository: Repository<Sac>;

  constructor() {
    this.ormRepository = getRepository(Sac);
  }

  public async list(): Promise<Sac[]> {
    return this.ormRepository.createQueryBuilder('sacs').select().getMany();
  }

  public async store(data: ISac.DTO.Store): Promise<Sac> {
    const sac = this.ormRepository.create(data);
    return this.ormRepository.save(sac);
  }

  public async update(sac: Sac): Promise<Sac> {
    return this.ormRepository.save(sac);
  }
}
