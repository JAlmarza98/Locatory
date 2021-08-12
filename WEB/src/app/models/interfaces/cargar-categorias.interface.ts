import { Categoria } from '../index';

export interface CargarCategoria {
  page: number;
  categories_this_page: number;
  total_categories: number;
  categories: Categoria[];
  uid: string;
}
