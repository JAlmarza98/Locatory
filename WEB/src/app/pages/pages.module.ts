import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos propios
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

//Componentes propios
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
