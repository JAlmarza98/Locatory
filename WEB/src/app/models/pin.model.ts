export class Pin {
  constructor(
    public name: string,
    public category: PopulateCategory,
    public status: boolean,
    public lat: number,
    public long: number,
    public finished: boolean,
    public description: string,
  ) {}
}

export interface IPin {
  name?: string;
  category?: PopulateCategory;
  status?: boolean;
  lat: number;
  long: number;
  finished: boolean;
  description?: string;
}

export interface PopulateCategory {
  _id: string;
  name: string;
}
