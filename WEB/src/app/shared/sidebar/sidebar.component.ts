import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

import { CargarCategoria, Categoria, ICategoria } from 'src/app/models';
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
        this.totalPages = this.totalPageCalculator(
          response.total_categories,
          response.categories_this_page
        );
        this.currentPage = response.page;
      });
  }

  totalPageCalculator(
    total_categories: number,
    categories_this_page: number
  ): number {
    let response: number = total_categories / categories_this_page;

    if (total_categories % categories_this_page != 0) {
      response++;
    }

    return response;
  }

  openNewCat() {
    this.modalService
      .open(NewCategoryComponent, {
        backdrop: 'static',
        size: 'sm',
        keyboard: false,
        centered: true,
        scrollable: false,
      })
      .result.then((result: ICategoria) => {
        if (result as ICategoria) {
          this.newCategory.color = result.color;
          this.newCategory.name = result.name;
          this.newCategory.description = result.description;

          console.log(this.newCategory);
          //TODO: llamar al servicio = notofocation service
        } else {
          //TODO: notification service
        }
      });
  }
}
