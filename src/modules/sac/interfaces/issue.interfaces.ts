import Issue from '@modules/sac/entities/issue';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

export namespace IIssue {
  export interface Repository {
    index(params: DTO.Index): Promise<PaginationAwareObject>;
    store(data: DTO.Store): Promise<Issue>;
    update(issue: Issue): Promise<Issue>;
  }

  export namespace DTO {
    export interface Index {
      sac_id: string;
      start_date: Date | string;
      end_date: Date | string;
      granularity: string;
    }

    export interface Store {
      title: string;
      description: string;
      sac_id: string;
    }

    export interface Update {
      title?: string;
      description?: string;
      sac_id?: string;
    }
  }
}
