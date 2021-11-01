import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {UserConfigComponent} from './user-config/user-config.component';
import {ShareComponent} from './share/share.component';

import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: UserConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'share/:categoryId',
    component: ShareComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
