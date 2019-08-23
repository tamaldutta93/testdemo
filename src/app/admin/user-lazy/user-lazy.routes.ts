import { Routes } from '@angular/router';

import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { AuthGuard as AuthGuard } from '../services/auth/auth.guard';
import { AuthCheckService as AuthCheck } from '../services/auth/auth-check.service';

export const userRoutes: Routes = [
{ path: '',
component: UserListComponent, canActivate: [AuthGuard],
/*children: [
    { path: 'add', component: UserAddComponent, canActivate:[AuthGuard]},
    { path: 'edit/:id', component: UserEditComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'users' }
],*/
},
{ path: 'add', component: UserAddComponent, canActivate: [AuthGuard]},
{ path: ':page', component: UserListComponent, canActivate: [AuthGuard] },
{ path: 'edit/:id/:page', component: UserEditComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: 'users' }
];

