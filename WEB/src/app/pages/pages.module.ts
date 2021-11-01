import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Modulos propios
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';

// Componentes propios
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from '../components/components.module';
import {ShareComponent} from './share/share.component';
import {UserConfigComponent} from './user-config/user-config.component';

import {API_KEY} from '../keys';

@NgModule({
  declarations: [HomeComponent, ShareComponent, UserConfigComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    FormsModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: API_KEY,
    }),
  ],
})
export class PagesModule {}
