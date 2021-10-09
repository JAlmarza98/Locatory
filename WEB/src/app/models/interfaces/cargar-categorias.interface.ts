/* eslint-disable camelcase */
import {Categoria} from '../index';

export interface CargarCategoria {
  page: number;
  total_pages: number;
  categories_this_page: number;
  total_categories: number;
  categories: Categoria[];
}
