import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NewCategoryComponent} from './modals/new-category/new-category.component';
import {ShowCategoryDataComponent} from './modals/show-category-data/show-category-data.component';
import {NotificationComponent} from './notification/notification.component';
import { ShareModalContainerComponent } from './modals/share-modal-container/share-modal-container.component';
import { ShareByUrlComponent } from './modals/share-modal-container/share-by-url/share-by-url.component';
import { ShareMethodSelectorComponent } from './modals/share-modal-container/share-method-selector/share-method-selector.component';

@NgModule({
  declarations: [
    NewCategoryComponent,
    ShowCategoryDataComponent,
    NotificationComponent,
    ShareModalContainerComponent,
    ShareByUrlComponent,
    ShareMethodSelectorComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    NewCategoryComponent,
    ShowCategoryDataComponent,
    NotificationComponent,
  ],
})
export class ComponentsModule {}
