import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// Modulos de terceros
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Modulos propios
import {ComponentsModule} from '../components/components.module';

// Componentes propios
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {FooterHomeComponent} from './footer-home/footer-home.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent, FooterHomeComponent],
  exports: [HeaderComponent, SidebarComponent, FooterComponent, FooterHomeComponent],
  imports: [CommonModule, NgbModule, ComponentsModule, RouterModule],
})
export class SharedModule {}
