/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

import { Component, OnInit, AfterViewInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, Validators, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserServiceService } from '../../services/user/user-service.service';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { User } from '../../models/user/user';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Path } from '../../services/config/path';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
// import { ToastsManager, ToastContainer } from 'ng6-toastr';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NotificationService } from '../../services/messages/notification.service';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserServiceService, FlashMessagesService, NotificationsService]
})
export class UserEditComponent implements OnInit,AfterViewInit {

    userForm: FormGroup = null;
    frmUser: any;
    userModel: User;
    path: Path;

    submitAttempt: boolean;
    editData: any;
    alertMessage: any;
    datepickerOptions: any;
    dateStart: any;
    editPage: number;
    srchKey: string;
    dateofbirth: any;
    user_dob: any;
    filesToUpload: Array<File>;
    formData: FormData = new FormData();

    profilePhoto: string;

    fileServPath: string;
    thisPageNum: number;
    imagePath: string;
    imagePreview: any;
    imagePreviewLoader: boolean;
    uploadedImage: File;
    imagePrevUrl: any;
    uploadFileSel: string;

    @Output()
    messageAlert: EventEmitter<String> = new EventEmitter<String>();

  constructor(
      private formBuilder: FormBuilder,
      private objUserServ: UserServiceService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private _authServ: AuthService,
      private ng2ImgMax: Ng2ImgMaxService,
      private vcr: ViewContainerRef,
      private sanitizer: DomSanitizer,
      private spinnerService: Ng4LoadingSpinnerService,
      private _notif_service: NotificationsService,
      // public toastr: ToastsManager,
      private _location: Location,
      public toastr: ToastrManager
    ) {
      this.userModel = new User();
      this.path   = new Path();
      this.formBuilder = new FormBuilder();
      this.filesToUpload = [];
      this.imagePath  = this.path.API_IMAGE_PATH;
    }

    showMessage(event, message) {
      this.messageAlert.emit(message); // emmiting the event.
    }

    ngAfterViewInit() {
    }

  ngOnInit() {
    this.userForm = new FormGroup ({
        first_name: new FormControl(this.userModel.first_name , [Validators.required]),
        last_name: new FormControl(this.userModel.last_name, [Validators.required]),
        username: new FormControl(this.userModel.username, [Validators.required]),
        email: new FormControl(this.userModel.username, [Validators.email]),
        address: new FormControl(this.userModel.address),
        id: new FormControl(this.userModel.id),
        password: new FormControl(this.userModel.password),
        userPhoto : new FormControl(this.userModel.profile_pic)
      });

  // Get Edit Record
  let editId = 0, pageNum = 0, srchkey = '';
  this.route.params.subscribe(params => {
  editId = +params['id']; // (+) converts string 'id' to a number
  pageNum = +params['page'];
  srchkey = this.route.snapshot.params['srchkey'];

  this.thisPageNum = pageNum;
  this.editPage  = pageNum;
  this.srchKey   = srchkey;
  this.objUserServ.adminUserEdit(editId).subscribe(
        data => {
          this.editData = data;
          this.userModel = data.record[0];
        });
  });
  // Reset All toaster currently showing
  this.toastr.dismissAllToastr();
}

submitForm(event) {
    this.submitAttempt = true;
    if (this.userForm.valid) {
            console.log(this.userModel);
            const formModel   = this.prepareForm();
            this.spinnerService.show();
          this.objUserServ.userSave(formModel).subscribe(
            data => {
              if (data.status) {
                this.spinnerService.hide();
                // this.alertMessage = 'Modified Records';
                //this._alertMesg.setMessage('Modified Records');
                //alert(this._alertMesg.getmessage());
                //this._alertService.showAlert(true, 'Records Modified');
                //this._notif_service.success("ggdfdfs");
                this.toastr.successToastr('Records Modified', 'Success!');
                this.router.navigate(['admin/users/' + this.thisPageNum]);
                /*this._notif_service.success(
                  'Success',
                  'Records Modified',
                  {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: true,
                    maxLength: 50
                  }
                );
                setTimeout(() => {
                  this.router.navigate(['admin/users']);
              }, 3100);*/
              } if (data.status === 0) {
                this.spinnerService.hide();
                this._notif_service.error(
                  'Validation Error',
                  data.message,
                  {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: true,
                    maxLength: 50
                  });
                  // this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000 });
                  // window.scrollTo(0, 0);
              }
        });
        return false;
      } else {
        this.flashMessage.show('Please check required fields properly!', { cssClass: 'alert-warning', timeout: 3500 });
      }
}

prepareForm(): any {
  const formData    =   new FormData();
  const getToken    =   this._authServ.getLoginToken();

  formData.append('first_name', this.userForm.get('first_name').value);
  formData.append('last_name', this.userForm.get('last_name').value);
  formData.append('email', this.userForm.get('email').value);
  formData.append('username', this.userForm.get('username').value);
  formData.append('address', this.userForm.get('address').value);
  formData.append('password', this.userForm.get('password').value);
  formData.append('userPhoto', this.uploadedImage);
  const id = this.userModel.id;
  formData.append('id', JSON.stringify(id));
  formData.append('token', getToken);

  return formData;
}

getImagePreview(file: File) {
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);
  this.imagePreviewLoader = true;
  reader.onload = () => {
    // this.imagePreview = reader.result;
    // const readrResult   = (Array.arguments(reader.result));
    // console.log(reader.result);
    this.imagePrevUrl = this.getSantizeUrl(reader.result.toString());
    this.imagePreview = true;
    this.imagePreviewLoader = false;
    this.spinnerService.hide();
  };
}

public getSantizeUrl(url: string) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

validateFileExtension(ext: String) {
  if (ext.toLowerCase() === 'png') {
      return true;
  } else if (ext.toLowerCase() === 'jpg') {
    return true;
  } else if (ext.toLowerCase() === 'jpeg') {
    return true;
  } else {
      return false;
  }
}

fileChangeEvent(event) {
    this.uploadFileSel = '';
    this.imagePreview = false;
    this.imagePreviewLoader = true;
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
          if (file.size > 2000000) {
            // this.flashMessage.show('Image size should be 2MB', {cssClass: 'alert-danger', timeout: 3500 });
            // window.scrollTo(0, 0);
            this.imagePreviewLoader = false;
            this._notif_service.error(
              'Validation Error',
              'Image size should be 2MB',
              {
                timeOut: 1500,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                maxLength: 50
              });
            return false;
          } else if (!this.validateFileExtension(ext)){
            // this.flashMessage.show('Image Type should jpg,png,jpeg', {cssClass: 'alert-danger', timeout: 3500 });
            // window.scrollTo(0, 0);
            this.imagePreviewLoader = false;
            this._notif_service.error(
              'Validation Error',
              'Image Type should jpg,png,jpeg',
              {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 50
              });
            return false;
          } else {
            this.uploadFileSel  = file;
            this.spinnerService.show();
            this.ng2ImgMax.resize([file], 500, 500).subscribe(
              (result) => {
                this.uploadedImage = new File([result], result.name);
                this.getImagePreview(this.uploadedImage);
            });
          }
        }
    }
}
