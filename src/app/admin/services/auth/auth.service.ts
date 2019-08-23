import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Path } from '../config/path';

@Injectable()
export class AuthService {
  private actionUrl: string;

  public tokenData : any = [];  
  private path : Path;
  public tokenStatus : boolean = false;

  public Server = '';
  public ApiUrl = 'isAdminLogin';
  public ApiUrlLogin  = 'auth/login';

  public ServerWithApiUrl = '';
  public ServerWithApiUrlLogin = '';
  public isLoggedIn 	=	false;

  private headers;
  private options;

  
  constructor(private http: HttpClient) { 
      this.path       = new Path();
      this.Server     = this.path.API_PATH;   
      
      this.ServerWithApiUrl = this.Server + this.ApiUrl;
      this.ServerWithApiUrlLogin = this.Server + this.ApiUrlLogin;

      this.headers = new Headers({ 'Access-Control-Allow-Origin' : '*'});
      this.options = new RequestOptions({ headers: this.headers });
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.ServerWithApiUrlLogin, { username: username, password: password }, { headers: this.headers })
        .map(user => {
          return user;
        });
  }

  logout(){
    localStorage.removeItem('loginToken');
    this.isLoggedIn = false;
  }

  getLoginToken():string{
    let getToken 		=	'';
    if(localStorage.getItem('loginToken') != undefined){
        let getTokenData 	=	JSON.parse(localStorage.getItem('loginToken'));
        getToken 		      =	getTokenData.token;
    }
    return getToken;
  }

  isTokenData() : any{

    return this.tokenData;
  }

  getTokenStatus(): any{

    return this.tokenStatus;
  }

  isTokenStatus(): any{

    this.actionUrl 	=	this.ServerWithApiUrl;
    let getToken 		=	'';
    if(localStorage.getItem('loginToken') != undefined){
      let getTokenData 	=	JSON.parse(localStorage.getItem('loginToken'));
      getToken 		    =	getTokenData.token;
    }
    
   
    return this.http.post<any>(this.actionUrl,{token:getToken})
        .map(respData => respData);
    //alert('login status...'+this.tokenStatus);
    //console.log(retData);
  
   //return true;
  }

  isAdminLogin() : any{

    this.actionUrl 	=	this.ServerWithApiUrl;
    let getToken 		=	'';
    if(localStorage.getItem('loginToken') != undefined){
      let getTokenData 	=	JSON.parse(localStorage.getItem('loginToken'));
      getToken 		    =	getTokenData.token;
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
   
      return this.http.post<any>(this.actionUrl,{token:getToken})
        .map(respData => {
            console.log(respData);
            return respData;
        });    
}
}
