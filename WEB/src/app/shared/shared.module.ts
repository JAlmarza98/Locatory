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

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, NgbModule, ComponentsModule, RouterModule],
})
export class SharedModule {}
