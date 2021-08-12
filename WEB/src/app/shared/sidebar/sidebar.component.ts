import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

import { CargarCategoria, Categoria, ICategoria } from 'src/app/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: Categoria[];
  totalPages: number;
  currentPage: number;

  newCategory: ICategoria = {
    status: true,
    color: '',
    user: this.userService.uid,
    name: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
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
    console.log('nueva categoria');
  }
}
