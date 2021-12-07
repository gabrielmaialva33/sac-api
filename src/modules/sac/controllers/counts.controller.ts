import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ICount } from '@modules/sac/interfaces/icounts.interfaces';

import {
  IndexCountService,
  StoreCountService
} from '@modules/sac/services/count';

export default class CountsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { per_page, issue_id } = request.query;

    const indexCount = container.resolve(IndexCountService);
    const counts = await indexCount.execute({
      per_page: Number(per_page),
      issue_id: String(issue_id)
    });

    return response.json(counts);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const data: ICount.DTO.Store = request.body;

    const storeCount = container.resolve(StoreCountService);
    const count = await storeCount.execute(data);

    return response.json(count);
  }
}
