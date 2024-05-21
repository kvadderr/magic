export interface IGetServersRes {
  sections: IGetSectionsRes[]
}

export interface IGetSectionsRes {
  id: number;
  html: string;
  icon: string | null;
  title: string;
}
