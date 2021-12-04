import { Response } from 'express';

export default class CountsController {
  public async store(request: Response, response: Response): Promise<Response> {
    return response.json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
