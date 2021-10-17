export class Pin {
  constructor(
    public name: string,
    public category: PopulateCategory,
    public status: boolean,
    public lat: string,
    public long: string,
    public finished: boolean,
    public description: string,
  ) {}
}

export interface IPin {
  name: string;
  category?: PopulateCategory;
  status?: boolean;
  lat: string;
  long: string;
  finished?: boolean;
  description?: string;
}

export interface PopulateCategory {
  _id: string;
  name: string;
}
