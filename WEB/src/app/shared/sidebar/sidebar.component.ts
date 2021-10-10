import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CargarCategoria, Categoria, ICategoria, ShowDataModalActions} from 'src/app/models';

import {CategoryService, NotificationService} from 'src/app/services';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {
  NewCategoryComponent,
  ShowCategoryDataComponent,
} from 'src/app/components/modals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() showPinsCollection = new EventEmitter<ICategoria>();

  uid!: string;
  categories!: Categoria[];
  totalPages!: number;
  currentPage!: number;

  prev: boolean;
  next!: boolean;

  newCategory: ICategoria = {
    status: true,
    color: '',
    name: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.categoryService
        .getUserCategories()
        .subscribe((response: CargarCategoria) => {
          this.categories = response.categories;
          this.totalPages = response.total_pages;
          this.currentPage = response.page;
          this._hasPrev();
          this._hasNext();
        });
  }

  openNewCat(): void {
    this.modalService
        .open(NewCategoryComponent, {
          backdrop: 'static',
          size: 'lg',
          keyboard: false,
          centered: true,
          scrollable: false,
        })
        .result.then((result: ICategoria) => {
          if (result as ICategoria) {
            this.newCategory.color = result.color;
            this.newCategory.name = result.name;
            this.newCategory.description = result.description;
            this.newCategory.user = this.uid;

            this.categoryService
                .newCategory(this.newCategory)
                .subscribe((response: CargarCategoria) => {
                  if ((response as CargarCategoria).page) {
                    this.categories = response.categories;
                    this.totalPages = response.total_pages;
                    this.currentPage = response.page;

                    this.notificationService.success(
                        'Categoría añadida',
                        'La categoría ha sido añadida a su colección con éxisto',
                        3000);
                  } else {
                    this.notificationService.error(
                        'Error',
                        'Ha ocurrido un error inesperado y no se ha podido completar la acción, por favor intentelo más tarde',
                        3000);
                  }
                });
          }
        });
  }

  actionCategoryModal(category: ICategoria): void {
    const modalDialog = this.modalService.open(ShowCategoryDataComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true,
      scrollable: false,
    });

    modalDialog.componentInstance.category = category;

    modalDialog.result.then((result: ShowDataModalActions) => {
      if (result.action.deleteCategory) {
        const categoryToDelete = this.categories.find((category: Categoria) => category.id === result.id);

        this.categoryService.deleteCategory(categoryToDelete).subscribe((response: CargarCategoria) =>{
          if ((response as CargarCategoria).total_categories) {
            this.notificationService.success(
                'Categoría eliminada',
                'La categoría ha sido eliminada de su colección con existo',
                3000);

            this.categories = response.categories;
            this.totalPages = response.total_pages;
            this.currentPage = response.page;
          } else {
            this.notificationService.error(
                'Error',
                'Ha ocurrido un error inesperado y no se ha podido completar la acción, por favor intentelo más tarde',
                3000);
          }
        });
      } else if (result.action.editCategory) {
        // TODO: modal de edicion de categoria
      } else {
        // TODO: mostrar pines en el mapa
      }
    });
  }

  showPins(category: ICategoria): void {
    this.showPinsCollection.emit(category);
  }

  previousPage(): void {
    if (this.prev) {
      this.categoryService
          .getUserCategories(this.currentPage - 1)
          .subscribe((response: CargarCategoria) => {
            this.categories = response.categories;
            this.totalPages = response.total_pages;
            this.currentPage--;
            this._hasPrev();
            this._hasNext();
          });
    }
  }

  nextPage(): void {
    if (this.next) {
      this.categoryService
          .getUserCategories(this.currentPage + 1)
          .subscribe((response: CargarCategoria) => {
            this.categories = response.categories;
            this.totalPages = response.total_pages;
            this.currentPage++;
            this._hasPrev();
            this._hasNext();
          });
    }
  }

  private _hasNext(): void {
    if (this.currentPage === this.totalPages) {
      this.next = false;
    } else {
      this.next = true;
    }
  }

  private _hasPrev(): void {
    if (this.currentPage === 1) {
      this.prev = false;
    } else {
      this.prev = true;
    }
  }
}
