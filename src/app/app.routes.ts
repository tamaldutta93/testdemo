import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HeaderComponent } from './admin/layout/header/header.component';
import { SidebarComponent } from './admin/layout/sidebar/sidebar.component';
import { FooterComponent } from './admin/layout/footer/footer.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './admin/login/login.component';

import { AuthGuard as AuthGuard } from './admin/services/auth/auth.guard';
import { AuthCheckService as AuthCheck } from './admin/services/auth/auth-check.service';

export const routes: Routes = [
{ path: 'admin',
component: AppComponent,
children: [
    { path: 'login', component: LoginComponent, canActivate: [AuthCheck] },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {
        path: 'dashboard',
        children: [
            {
                path: '',
                loadChildren: './admin/dashboard-home/dashboard-home.module#DashboardHomeModule'
            }
        ]
    },
    {
        path: 'users',
        children: [
            {
                path: '',
                loadChildren: './admin/user-lazy/user-lazy.module#UserLazyModule'
            }
        ]
    },
    // { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'login' }
],
},
{ path: '**', redirectTo: 'login' }
];

