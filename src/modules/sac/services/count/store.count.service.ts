import { inject, injectable } from 'tsyringe';

import { ICount } from '@modules/sac/interfaces/icounts.interfaces';
import Count from '@modules/sac/entities/count';

import AppError from '@shared/errors/AppError';

@injectable()
export class StoreCountService {
  constructor(
    @inject('CountsRepository')
    private countsRepository: ICount.Repository
  ) {}

  public async execute(data: ICount.DTO.Store): Promise<Count> {
    try {
      return this.countsRepository.store(data);
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
