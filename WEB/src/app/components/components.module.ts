import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewCategoryComponent } from './modals/new-category/new-category.component';
import { ShowCategoryDataComponent } from './modals/show-category-data/show-category-data.component';

@NgModule({
  declarations: [NewCategoryComponent, ShowCategoryDataComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [NewCategoryComponent],
})
export class ComponentsModule {}
