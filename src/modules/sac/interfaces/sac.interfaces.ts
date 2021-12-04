import Sac from '@modules/sac/entities/sac';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

export namespace ISac {
  export interface Repository {
    index(): Promise<PaginationAwareObject>;
    store(data: DTO.Store): Promise<Sac>;
    update(sac: Sac): Promise<Sac>;
  }

  export namespace DTO {
    export interface Store {
      name: string;
      url: string;
      description: string;
    }

    export interface Update {
      name?: string;
      url?: string;
      description?: string;
    }
  }
}
