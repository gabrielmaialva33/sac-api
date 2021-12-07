import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import Count from '@modules/sac/entities/count';

export namespace ICount {
  export interface Repository {
    index(params: DTO.Index): Promise<PaginationAwareObject>;
    store(data: DTO.Store): Promise<Count>;
    update(count: Count): Promise<Count>;
  }

  export namespace DTO {
    export interface Index {
      per_page: number;
      issue_id: string;
    }

    export interface Store {
      issue_id: string;
    }

    export interface Update {
      issue_id?: string;
    }
  }
}
