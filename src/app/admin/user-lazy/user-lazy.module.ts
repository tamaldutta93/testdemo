import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { userRoutes } from './user-lazy.routes';
import { RouterModule } from '@angular/router';
import { PartialModule } from '../../partial/partial.module';
import { UserLazyComponent } from './user-lazy.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NglModule } from 'ng-lightning/ng-lightning';
import { SimpleNotificationsModule } from 'angular2-notifications';
// import { ToastModule } from 'ng6-toastr';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2ImgMaxModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FlashMessagesModule.forRoot(),
    RouterModule.forChild(userRoutes),
    SimpleNotificationsModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserLazyComponent
  ],
  exports: [
    RouterModule
  ]
})
export class UserLazyModule {
  constructor() {
    console.log('UserLazyModule loaded.');
  }

}
