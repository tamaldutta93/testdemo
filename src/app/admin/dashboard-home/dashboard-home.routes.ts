import { Routes } from '@angular/router';

// import { AppComponent } from './app.component';

import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

import { AuthGuard as AuthGuard } from '../services/auth/auth.guard';
import { AuthCheckService as AuthCheck } from '../services/auth/auth-check.service';

export const dashboardRoutes: Routes = [
{ path: '',
component: DashboardHomeComponent, canActivate: [AuthGuard],
},
{ path: '**', redirectTo: 'login' }
];

