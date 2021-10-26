import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';

// Modulos propios
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';

// Componentes propios
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from '../components/components.module';
import { ShareComponent } from './share/share.component';

@NgModule({
  declarations: [HomeComponent, ShareComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqyHk8xXu44wHyyK0BfP8HbcPgi6UlP6E',
    }),
  ],
})
export class PagesModule {}
