import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

//Modulos propios
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

//Componentes propios
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqyHk8xXu44wHyyK0BfP8HbcPgi6UlP6E',
    }),
  ],
})
export class PagesModule {}
