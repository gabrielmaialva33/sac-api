import { inject, injectable } from 'tsyringe';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { Sac } from '@modules/sac/models/Sac';
import AppError from '@shared/errors/AppError';

@injectable()
export default class StoreSacService {
  constructor(
    @inject('SacsRepository')
    private sacsRepository: ISac.Repository<Sac>
  ) {}

  public async execute(data: ISac.DTO.Store): Promise<Sac> {
    try {
      return this.sacsRepository.store(data);
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
