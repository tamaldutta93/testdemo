import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DashboardComponent]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  // public isLoginStatus: boolean;
  constructor(public _authServ: AuthService, public _router: Router,
    private compDash: DashboardComponent) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this._authServ.isAdminLogin().subscribe(
    //   data => {
    //       this.loginData =  data;
    //       this.isLoginStatus = (this.loginData.status === 1) ? true : false;

    //       alert(this.isLoginStatus);
    //   });
  }

  logout() {
    this._authServ.logout();
    // top.location.href = 'admin/login';
    this._router.navigate(['admin/login']);
  }

  extCallMe() {
    this.compDash.callMe();
  }
}
