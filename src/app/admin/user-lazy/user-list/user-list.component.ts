/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/

import { Component, ElementRef, OnInit, ViewContainerRef, Pipe, AfterViewInit,
            Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';

import { PagerService } from '../../services/paging/pager.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Path } from '../../services/config/path';
import { User } from '../../models/user/user';

import { UserEditComponent } from '../user-edit/user-edit.component';
// import { AlertMessages } from '../../services/messages/alert-messages';

import { AlertService, AlertMessage } from '../../services/messages/alert.service';
import { NotificationsService } from 'angular2-notifications';


declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserServiceService, PagerService, AlertService, FlashMessagesService, UserEditComponent]
}) 
export class UserListComponent implements OnInit, AfterViewInit,OnChanges {

  path: Path;
  // _alertMesg: AlertMessages;
  objAlert: AlertMessage;
  userModel: User;
  public listData: any = [];
  public totalData: any;
  public adminLimit: number;
  public pageNum: number;
  public totalPages: number;
  public limitNum: number;
  public srchKey: any;
  public totalRec: any;
  public sortByField: string;
  public sortByDir: string;

  public sortKey: any = [];

  imagePath: string;

  public pagedItems: any;
  public pagedGItems: any;
  public messageShow: any;

  public customMesg: string;
  private respData: any;
  public messageStatus: boolean;

  public viewContainerRef: ViewContainerRef;
  thisMesg: any;

  @Input()
  username: string;

  //@ViewChild(ChildComponent) child;

  constructor(private service: UserServiceService,
              private objPager: PagerService,
              private flashMessage: FlashMessagesService,
              private route: ActivatedRoute,
              private _router: Router,
              private elRef: ElementRef,
              viewContainerRef: ViewContainerRef,
              private compEdit: UserEditComponent,
              private alertService: AlertService,
              private _notificationservices: NotificationsService
              ) {
      this.userModel = new User();
      this.path   = new Path();
      // this._alertMesg = new AlertMessages();
      this.imagePath  = this.path.API_IMAGE_PATH;
      this.pageNum = 1;
      this.limitNum = 4;

      this.sortKey = 'first_name';

      this.sortByField = 'first_name';
      this.sortByDir = 'asc';
      this.pagedItems   = [];
      this.pagedGItems = [];
      this.messageStatus = false;

      this.viewContainerRef = viewContainerRef;

      }

  ngOnChanges() {
    // changes.prop contains the old and the new value...
    alert('change happen...');
  }

  showMessageFromParent = function(mesage){
    alert(mesage);
  }


  /*openPopup() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }*/

  ngOnInit() {

      let editPage = 0, srchKey = '';
      this.route.params.subscribe(params => {
       editPage = +params['page']; // (+) conv string to number
       srchKey  = this.route.snapshot.params['srchkey'];

       if (editPage != undefined && editPage > 0){
          this.pageNum = editPage;
       }if (srchKey != undefined && srchKey != ''){
          this.srchKey = srchKey;
       }
       //alert('...'+this.flashMessageData.alertMessages);
       //alert('@ '+alert(this.path.getMessage()));
      //Init List Data

      this.getTotalData(this.srchKey);
      this.getListData(this.pageNum, this.limitNum, this.srchKey, '');
    });

    // this.alertService.alertStatus.subscribe((val: AlertMessage) => {
    //   this.objAlert = { show: val.show, message: val.message };
    // });
    

    //this.checkImageExists(this.imagePath, '1543321225.jpg');
    //let thisMesg  =   this.flashMessageData.getMessage();
      //alert(thisMesg);

    /*this._router.navigate(['users/list'])
      .then(_ => {
        //alert('load list page...');
        //this.isInitialized = true; 
        //this._router.navigate(['Page1']);
    })*/

      //Get Last data message if any
      //let lastAlertMessage  = this.flashMessageData.getMessage();
      //alert('mesg: '+lastAlertMessage);
      /*if(lastAlertMessage != '' && lastAlertMessage != undefined)
      {      
        this.flashMessage.show(lastAlertMessage, {cssClass: 'alert-success', timeout: 3500 });
        //this.flashMessageData.clearMessage();
      }*/
    }

  onCloseAlert(reason: string) {
      const objCloseAlert: AlertMessage = { show: false, message: '' };
      this.alertService.showAlert(false, null);
  }

    imageExists(url, callback) {
      const img = new Image();
      img.onload = function() { callback(true); };
      img.onerror = function() { callback(false); };
      img.src = url;
    }

    checkUrl(img) {
      console.log('image: ' + img);
    }

    checkImageExists(imagename) {
      const imageUrl  = this.imagePath + 'user/' + imagename;
      this.imageExists(imageUrl, function(exists) {
        console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
        console.log('-------------------------------------------------');
        return exists;
      });
    }

    getUserInfo(userid : number){
      this.service.adminGetUserById(userid).subscribe(
        data => {
          this.respData = data.userData[0];
          this.userModel = this.respData;
            $("#myModal").modal('show');
        });
    }

    ngAfterViewInit() {
      //const div = this.elRef.nativeElement.querySelector('div');
      //console.log(div);
      // const obj: Object = {
      //   prop1: 'test',
      //   prop2: true,
      //   prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
      //   prop4: 327652175423
      // };
      //this.ngxSmartModalService.setModalData(obj, 'myModal');

        // $(document).ready(function () {
        //  // alert('menu load @user');
        //   $('.sidebar-menu').tree()
        // })

        const message = this.compEdit.alertMessage;
        
    }

  listSort(sortField : string){
    this.sortKey    = sortField;
    this.sortByDir  = (this.sortByDir === 'asc') ? 'desc' : 'asc'; 
    this.getListData(this.pageNum, this.limitNum, this.srchKey, 'sort' );
  }

  exportUser(){

    //this.expExcel.exportAsExcelFile('','');
  }

  userDelete(dataId):any{
    if(confirm("Are you sure to delete ?")) {
        //Delete record
        this.service.adminUserDelete(dataId).subscribe(
        data => {
          this.respData = data;
              if(this.respData.status){
                this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 3500 });
                this.getTotalData(this.srchKey);
                this.getListData(this.pageNum, this.limitNum, this.srchKey,'');
              }
        });
    }
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  createPages(totalPages){
    let items = [];
    for (var i = 1; i <= totalPages; i++) {
       this.pagedItems.push({val:i});
    }
  }

  getTotalData(srchKey){
    this.service.adminGetUserData(srchKey).subscribe(
        data => {
          let totalRec = data;
          if(totalRec != undefined){
            if(totalRec){
                let totalData   = totalRec.totalRecord;
                this.totalRec   = totalData;
                let totalPage   = Math.ceil(totalData / this.limitNum);
                this.totalPages = totalPage;

                this.createPages(this.totalPages);
                //Get Pager services
                let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, 1);
                this.pagedGItems   = pagesItems;
            }
          }
        });
  }

  onSearchChange(srchVal){
    this.getTotalData(srchVal);
    this.getListData(1, this.limitNum, srchVal, '');
  }

  getListData(pageNum:number=0, limitNum:number=this.limitNum, srchKey:string='', queryType:string){
    //, sortByField:string='', sortByDir=''
    this.pageNum = pageNum;
    //this.sortByDir = (sortByDir == 'asc') ? 'desc' : 'asc';
    let thisDir = this.sortByDir;
    //this.listData = '';
    //alert(pageNum);
    this.service.adminUserList(pageNum, limitNum, srchKey, queryType, this.sortByField, this.sortByDir).subscribe(
        data => {
          this.listData = data.record;

          console.log('#### user list data #######');
          console.log(data);

        //Get Pager services
        let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, pageNum);
        //alert('###### page data....');
        this.pagedGItems   = pagesItems;
        });
  }

}

