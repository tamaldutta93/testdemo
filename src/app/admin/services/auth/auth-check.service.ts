import { Injectable } from '@angular/core';
import { Router, CanActivate, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { ServiceService } from './service.service';
import { Location } from '@angular/common';
import { JwtHelper } from 'angular2-jwt';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthService as AuthServ } from './auth.service';
import { Path } from '../config/path';

@Injectable()
export class AuthCheckService implements CanActivate {
private actionUrl: string;
private path: Path;

private server: string;
private apiUrl: string;
logData: any;
jwtHelper: JwtHelper = new JwtHelper();

  constructor(
// tslint:disable-next-line:indent
// public 		auth: ServiceService,
public 		router: Router,
private 	http: Http,
private 	location: Location,
private 	_authServ: AuthServ,
private 	_router: Router
) {	this.path       =   new Path();
// tslint:disable-next-line:indent
	this.server 	=	this.path.API_PATH;
}
isAdminLoginStatus(): any {
this._authServ.isAdminLogin()
            .subscribe(
data => {
const response = data;
console.log('####### Check Auth log data ########');
console.log(response);
if (response.status) {
return true;
}
return false;
});
}

canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {
const getToken  = localStorage.getItem('loginToken');
console.log(getToken);
  if (getToken != '' && getToken != null && getToken !== undefined )  {
    const tokenObj 	= JSON.parse(getToken);
    if (getToken === '' || getToken === undefined) {
    return true;
    } else {
    const thisToken = tokenObj.token;
    if (this.jwtHelper.isTokenExpired(thisToken)) {
    return true;
    }
    this._router.navigate(['/admin/dashboard']);
    return false;
    }
} else {
  return true;
}

}


}
