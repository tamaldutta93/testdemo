/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/

import { Component, OnInit, AfterViewInit, ChangeDetectorRef,ElementRef, ViewChild } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import { FormBuilder,FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserServiceService } from '../../services/user/user-service.service';
// import { CommonService } from '../../services/common.service';
import {Http, Headers,Response,RequestOptions} from '@angular/http';
import { User } from '../../models/user/user';
import { Router, ActivatedRoute } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
// import {FlashMessageDataService} from '../../admin-service/flashMessageData.service';
import { AuthService } from '../../services/auth/auth.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationsService } from 'angular2-notifications';
import { ToastrManager } from 'ng6-toastr-notifications';

import { NotificationService } from '../../services/messages/notification.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  /*animations: [
    trigger('visibilityChanged', [
      state('shown' , style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])]*/
  providers: [UserServiceService, FlashMessagesService, NotificationService]
})

export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  frmUser:any;
  userModel : User;

	submitAttempt: boolean = false;
  formFiles: any[] = [];
  formData: FormData = new FormData();
  path = '';
  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  files : FileList;
  alertMessage : any;
  messageStatus : boolean;
  filesToUpload: Array<File>;

  imagePreview: any;
    imagePreviewLoader : boolean = false;
    uploadedImage : File;
    imagePrevUrl : any;
    uploadFileSel : string;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
              private formBuilder: FormBuilder,
              private objUserServ: UserServiceService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private _authServ: AuthService,
              private spinnerService: Ng4LoadingSpinnerService,
              private ng2ImgMax: Ng2ImgMaxService,
              private sanitizer: DomSanitizer,
              private _notif_service: NotificationsService,
              private _custom_notif_service: NotificationService,
              public toastr: ToastrManager
              ) {
      this.userModel = new User();
      this.messageStatus  = false;
      this.filesToUpload = [];
  }

  submitForm(event) {
      this.submitAttempt = true;
      if (this.userForm.valid) {
              const formModel   = this.prepareForm();
            this.objUserServ.userSave(formModel).subscribe(
              data => {
                if (data.status) {
                  this.toastr.successToastr('New Records Added', 'Success!');
                  this.router.navigate(['admin/users']);
                }
                if (data.status === 0) {
                   /* this._notif_service.error(
                    'Validation Error',
                    data.message,
                    {
                      timeOut: 2000,
                      showProgressBar: true,
                      pauseOnHover: false,
                      clickToClose: true,
                      maxLength: 50
                    });*/
                    this._custom_notif_service.initNotification('error', 'Validation Error',
                              data.message, 2000, true, true, true);
                    // this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3500 });
                    // window.scrollTo(0, 0);
                }
          });
          return false;
        } else {
            // this.flashMessage.show("Please check required fields properly!", { cssClass: 'alert-warning', timeout: 3500 });
            /*this._notif_service.error(
            'Validation Error',
            'Please check required fields properly!',
            {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            });*/
            this._custom_notif_service.initNotification('warn', 'Validation Error',
                        'Please check required fields properly!', 2000, true, true, true);
        }
  }

  prepareForm() : any{
    let formData  = new FormData();
    let getToken    =   this._authServ.getLoginToken();

    formData.append('first_name',this.userForm.get('first_name').value);
    formData.append('last_name',this.userForm.get('last_name').value);
    formData.append('email',this.userForm.get('email').value);
    formData.append('username',this.userForm.get('username').value);
    formData.append('address',this.userForm.get('address').value);
    formData.append('password',this.userForm.get('password').value);
    formData.append('userPhoto', this.uploadedImage);
    formData.append('token', getToken);
    //this.userForm.get('userPhoto').value
    return formData;
  }

    validateFileExtension(ext: String) {
      // var ext = name.substring(name.lastIndexOf('.') + 1);
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

    getImagePreview(file: File) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      this.imagePreviewLoader = true;
      //this.spinnerService.show();
      reader.onload = () => {
        //this.imagePreview = reader.result;
        //const readrResult   = (Array.arguments(reader.result));
        //console.log(reader.result);
        this.imagePrevUrl = this.getSantizeUrl(reader.result.toString());
        this.imagePreview = true;
        this.imagePreviewLoader = false;
        this.spinnerService.hide();
      };
    }

    public getSantizeUrl(url: string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    fileChangeEvent(event) {
    this.uploadFileSel = '';
    this.imagePreview = false;
    this.imagePreviewLoader = true;
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.files  = file;
          const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
          if (file.size > 2000000) {
            this.imagePreviewLoader = false;
            this._custom_notif_service.initNotification('error', 'Validation Error',
            'Image size should be 2MB', 2000, true, true, true);
            return false;
          } else if (!this.validateFileExtension(ext)) {
            this.imagePreviewLoader = false;
            this._custom_notif_service.initNotification('error', 'Validation Error',
            'Image Type should jpg,png,jpeg', 2000, true, true, true);
            return false;
          } else {
              this.uploadFileSel  = file;
              //this.imagePreviewLoader = true;
              this.spinnerService.show();
              this.ng2ImgMax.resize([file], 500, 500).subscribe(
                (result) => {
                  this.uploadedImage = new File([result], result.name);
                  this.getImagePreview(this.uploadedImage);
              });
          }
        }
    }
ngOnInit() {
      const getToken    =   this._authServ.getLoginToken();
      this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      userPhoto : new FormControl('')
    });
    this.toastr.dismissAllToastr();
  }

}

