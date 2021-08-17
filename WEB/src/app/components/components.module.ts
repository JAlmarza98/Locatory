import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewCategoryComponent } from './modals/new-category/new-category.component';

@NgModule({
  declarations: [NewCategoryComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [NewCategoryComponent],
})
export class ComponentsModule {}
