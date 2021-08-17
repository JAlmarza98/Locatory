export class Categoria {
  constructor(
    public status: boolean,
    public color: string,
    public user: PopulateUser,
    public name: string,
    public description: string,
    public id: string
  ) {}
}

export interface ICategoria {
  status?: boolean;
  color: string;
  user?: string;
  name: string;
  description: string;
  id?: string;
}

export interface PopulateUser {
  _id: string;
  name: string;
}
