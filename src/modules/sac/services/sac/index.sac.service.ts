import { inject, injectable } from 'tsyringe';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import Sac from '@modules/sac/entities/sac';

import AppError from '@shared/errors/AppError';

@injectable()
export class IndexSacService {
  constructor(
    @inject('SacsRepository')
    private sacsRepository: ISac.Repository
  ) {}

  public async execute(): Promise<Sac[]> {
    try {
      return this.sacsRepository.index();
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
