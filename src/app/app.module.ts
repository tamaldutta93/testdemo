import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
/*import { HeaderComponent } from './admin/layout/header/header.component';
import { SidebarComponent } from './admin/layout/sidebar/sidebar.component';
import { FooterComponent } from './admin/layout/footer/footer.component';
*/
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './admin/login/login.component';

import { routes } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { AuthGuard  } from './admin/services/auth/auth.guard';
import { AuthCheckService  } from './admin/services/auth/auth-check.service';
import { AuthService  } from './admin/services/auth/auth.service';
import { Path } from './admin/services/config/path';
import { AdminComponent } from './admin/admin.component';

import { PartialModule } from './partial/partial.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { CustomMaterialModule } from './core/material.module';


import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    /*HeaderComponent,
    SidebarComponent,
    FooterComponent,*/
    DashboardComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PartialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlashMessagesModule,
    RouterModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthGuard, AuthCheckService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('AppModule loaded.');
  }
}
