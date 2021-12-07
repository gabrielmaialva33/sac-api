import { inject, injectable } from 'tsyringe';

import { ICount } from '@modules/sac/interfaces/icounts.interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import AppError from '@shared/errors/AppError';

@injectable()
export class IndexCountService {
  constructor(
    @inject('CountsRepository')
    private countsRepository: ICount.Repository
  ) {}

  public async execute(data: ICount.DTO.Index): Promise<PaginationAwareObject> {
    try {
      return this.countsRepository.index(data);
    } catch (err) {
      throw new AppError(`${err}`, 500);
    }
  }
}
