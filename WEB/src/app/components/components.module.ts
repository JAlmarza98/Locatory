import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NewCategoryComponent} from './modals/new-category/new-category.component';
import {ShowCategoryDataComponent} from './modals/show-category-data/show-category-data.component';
import {NotificationComponent} from './notification/notification.component';
import {ShareModalContainerComponent} from './modals/share-modal-container/share-modal-container.component';
import {ShareByUrlComponent} from './modals/share-modal-container/share-by-url/share-by-url.component';
import {ShareMethodSelectorComponent} from './modals/share-modal-container/share-method-selector/share-method-selector.component';
import {NewPinComponent} from './modals/new-pin/new-pin.component';

import {AgmCoreModule} from '@agm/core';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { EditCategoryComponent } from './modals/edit-category/edit-category.component';

@NgModule({
  declarations: [
    NewCategoryComponent,
    ShowCategoryDataComponent,
    NotificationComponent,
    ShareModalContainerComponent,
    ShareByUrlComponent,
    ShareMethodSelectorComponent,
    NewPinComponent,
    ConfirmComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqyHk8xXu44wHyyK0BfP8HbcPgi6UlP6E',
    }),
  ],
  exports: [
    NewCategoryComponent,
    ShowCategoryDataComponent,
    NotificationComponent,
  ],
})
export class ComponentsModule {}
