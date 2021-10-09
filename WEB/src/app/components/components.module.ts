import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewCategoryComponent } from './modals/new-category/new-category.component';
import { ShowCategoryDataComponent } from './modals/show-category-data/show-category-data.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    NewCategoryComponent,
    ShowCategoryDataComponent,
    NotificationComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    NewCategoryComponent,
    ShowCategoryDataComponent,
    NotificationComponent,
  ],
})
export class ComponentsModule {}
