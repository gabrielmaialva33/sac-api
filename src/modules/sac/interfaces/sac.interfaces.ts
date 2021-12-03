export namespace ISac {
  export interface Repository<Sac> {
    list(): Promise<Sac[]>;
    store(data: DTO.Store): Promise<Sac>;
    update(sac: Sac): Promise<Sac>;
  }

  export namespace DTO {
    export interface Store {
      url: string;
      category: string;
      description: string;
    }

    export interface Update {
      url?: string;
      category?: string;
      description?: string;
    }
  }
}
