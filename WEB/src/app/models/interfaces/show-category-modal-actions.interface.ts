import {ICategoria} from 'src/app/models';

export interface ShowDataModalActions{
  id: string;
  data?: ICategoria;
  action?: CategoryModalAction;
}

export interface CategoryModalAction {
  deleteCategory?: boolean;
  showPins?: boolean;
  editCategory?: boolean;
}
