/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
// import { ServiceService } from '../admin-service/service.service';
import { AuthService } from '../services/auth/auth.service';
/// import { Router } from "@angular/router";
import { Path } from '../services/config/path';

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute
} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

declare var $: any;


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [AuthService]
})
export class LayoutComponent implements OnInit, AfterViewInit {
  public loginData: any;
  public isLoginStatus: boolean = false;
  public isCurRouteName: string;
  private pathObj: Path;

  constructor(public auth: AuthService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public spinnerService: Ng4LoadingSpinnerService) {
    this.isLoginStatus = false;
    const str   = router.url;
    const lastValue = str.substr(str.lastIndexOf('/') + 1);
    if(lastValue == 'home'){
      this.isCurRouteName = lastValue;
    }
    router.events.subscribe((event: RouterEvent) => {
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.spinnerService.show();
    }
    if (event instanceof NavigationEnd) {
      this.spinnerService.hide();
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.spinnerService.hide();
    }
    if (event instanceof NavigationError) {
      this.spinnerService.hide();
    }
  }
  @HostListener('click') onClick() {
    // window.alert('Host Element Clicked');
}
  ngOnInit() {
    //this.spinnerService.show();
    //Make layout authenticate structure
    this.auth.isAdminLogin().subscribe(
      data => {
        this.loginData =  data;
          this.isLoginStatus = (this.loginData.status === 1) ? true : false;

          //alert('layout: ' + this.isLoginStatus);
          //this.router.navigate(['admin/login']);
          console.log(this.isLoginStatus);
          //this.pathObj.adminLoginStatus = this.isLoginStatus;
          //console.log('admin log status:: ' + this.pathObj.adminLoginStatus);
      });
  }

  ngAfterViewInit() {
    //alert('layout load...');
    this.auth.isAdminLogin().subscribe(
      data => {
        this.loginData =  data;
          this.isLoginStatus = (this.loginData.status === 1) ? true : false;

          //alert('layout: ' + this.isLoginStatus);
          //this.router.navigate(['admin/login']);
          console.log('adter init...'+this.isLoginStatus);
      });
  }
}

