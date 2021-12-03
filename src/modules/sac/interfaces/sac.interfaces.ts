import Sac from '@modules/sac/entities/sac';

export namespace ISac {
  export interface Repository {
    index(): Promise<Sac[]>;
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
