import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

import {
  CargarCategoria,
  Categoria,
  ICategoria,
  Usuario,
} from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCategoryComponent } from 'src/app/components/modals/new-category/new-category.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  uid!: string;
  categories: Categoria[];
  totalPages: number;
  currentPage: number;

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
      });
  }

   openNewCat() {
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
}
