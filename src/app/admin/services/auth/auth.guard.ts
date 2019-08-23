import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Route } from '@angular/compiler/src/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper;

  constructor(private _router: Router) { this.jwtHelper  = new JwtHelper(); }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const getToken  = localStorage.getItem('loginToken');
      console.log(getToken);
    if (getToken != '' && getToken != null && getToken !== undefined )  {
          const tokenObj 	= JSON.parse(getToken);
          console.log(tokenObj);
          const thisToken = tokenObj.token;
          if (this.jwtHelper.isTokenExpired(thisToken)) {
            this._router.navigate(['/admin/login']);
            return false;
          }
          return true;
      }
      this._router.navigate(['/admin/login']);
      return false;
  }
}
