import { Component, OnInit } from '@angular/core';
import { CargarCategoria, Categoria, ICategoria } from 'src/app/models';

import { CategoryService } from 'src/app/services/category.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
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
              if (response as CargarCategoria) {
                this.categories = response.categories;
                this.totalPages = response.total_pages;
                this.currentPage = response.page;
              }
            });
        }
      });
    //TODO: llamar al servicio = notifocation service
  }

  editCat(category: ICategoria): void {
    const modalDialog = this.modalService.open(ShowCategoryDataComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true,
      scrollable: false,
    });

    modalDialog.componentInstance.category = category;
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
    console.log('_hasPrev');
    console.log('currentPage', this.currentPage);
    console.log('this.currentPage === 1', this.currentPage === 1);
    if (this.currentPage === 1) {
      this.prev = false;
    } else {
      this.prev = true;
    }
  }
}
