import Issue from '@modules/sac/entities/issue';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

export namespace IIssue {
  export interface Repository {
    index(): Promise<PaginationAwareObject>;
    store(data: DTO.Store): Promise<Issue>;
    update(issue: Issue): Promise<Issue>;
  }

  export namespace DTO {
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
