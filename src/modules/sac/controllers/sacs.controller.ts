import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ISac } from '@modules/sac/interfaces/sac.interfaces';
import { IndexSacService, StoreSacService } from '@modules/sac/services/sac';

export default class SacsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, granularity } = request.query;

    const indexSac = container.resolve(IndexSacService);
    const sacs = await indexSac.execute(<ISac.DTO.Index>{
      start_date,
      end_date,
      granularity
    });

    return response.json(sacs);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const data: ISac.DTO.Store = request.body;

    const storeSac = container.resolve(StoreSacService);
    const sac = await storeSac.execute(data);

    return response.json(sac);
  }
}
