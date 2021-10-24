import {Categoria} from 'src/app/models';

export interface ShowDataModalActions{
  id: string;
  data?: Categoria;
  action?: CategoryModalAction;
}

export interface CategoryModalAction {
  deleteCategory?: boolean;
  showPins?: boolean;
  editCategory?: boolean;
}

export interface UpdateCategoryData {
  color: string;
  description: string;
  name: string;
}

export interface UpdateCategoryresponse {
  category: Categoria;
  msg: string;
}
