import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../admin/layout/header/header.component';
import { SidebarComponent } from '../admin/layout/sidebar/sidebar.component';
import { FooterComponent } from '../admin/layout/footer/footer.component';

import { routes } from '../app.routes';
import { CustomInitDirective } from './custominit.directive';


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent, CustomInitDirective],
  exports: [
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CustomInitDirective,
    
],
})
export class PartialModule { }
