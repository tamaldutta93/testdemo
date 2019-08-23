import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

import { Path } from '../config/path';

@Injectable()
export class UserServiceService {
	
	private actionUrl: string;
    private path : Path;
  	private Server : string;// 'http://localhost:9090/api/';
	//public ApiUrl = 'user/isAdminLogin';
	// public ServerWithApiUrl = this.Server + this.ApiUrl;
	public isLoggedIn 	=	false;

	headers: Headers;
    options: RequestOptions;

    constructor(private http: Http,
                private router: Router,
                private _authServ: AuthService) {
        this.headers = new Headers({ 'Content-Type': 'application/json'});
        
        this.headers.append('Content-Type', 'accept');
        //this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        //this.headers.append('Access-Control-Allow-Headers', '*');
        // this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4503');
        // this.headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");

        this.options = new RequestOptions({ headers: this.headers });

        this.path       =   new Path();
        this.Server     =   this.path.API_PATH;
    }

    /******************************************
    *
    *   User CRUD Function
    *
    *
    *******************************************/

   adminGetUserById(userId : number) {
    // Check User Data
    this.actionUrl  =   this.Server + 'user-by-id' ;
    const getToken    =   this._authServ.getLoginToken();
    return this.http.post(this.actionUrl, {id:userId,token:getToken})
    .map(data => {
        data.json();
        // alert('total rec...');
        // the console.log(...) line prevents your code from working 
        // either rem+ove it or add the line below (return ...)
        // console.log("I CAN SEE TOTAL DATA HERE: ", data.json());
        return data.json();
    });
}

    adminGetUserData(srchKey) {
        // Check User Data
        this.actionUrl  =   this.Server + 'user-total-record' ;
        const getToken    =   this._authServ.getLoginToken();
        return this.http.post(this.actionUrl, {srchKey: srchKey, token: getToken})
        .map(data => {
            data.json();
            // alert('total rec...');
            // the console.log(...) line prevents your code from working 
            // either rem+ove it or add the line below (return ...)
            // console.log("I CAN SEE TOTAL DATA HERE: ", data.json());
            return data.json();
        });
    }

    adminUserList(pageNum: any, limitNum: any, srchKey: any, queryType: any, sortByField: any, sortByDir: any) {
        this.actionUrl  =   this.Server + 'user-list-record';
        const getToken    =   this._authServ.getLoginToken();
        console.log('----header request-----');
        console.log(this.options);
         return this.http.post(this.actionUrl, { limitNum: limitNum, pageNum: pageNum, srchKey: srchKey, queryType: queryType,
                                                 token: getToken, sortByField: sortByField, sortByDir: sortByDir}, this.options)
        .map(res => res.json());
    }

    adminUserEdit(editId: number = 0) {
        this.actionUrl  =   this.Server + 'user-edit';
            // alert(this.actionUrl);
        let getToken    =   this._authServ.getLoginToken();
         return this.http.post(this.actionUrl,{id:editId,token:getToken})
            .map(data => {
                data.json();
                // the console.log(...) line prevents your code from working 
                // either rem+ove it or add the line below (return ...)
                // console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }

    // Add New Record
    userSave(postData:any) : any{

        this.actionUrl  =   this.Server + 'user-save' ;
       
        return this.http.post(this.actionUrl, postData)
        .map(data => {
            data.json();
            // the console.log(...) line prevents your code from working 
            // either rem+ove it or add the line below (return ...)
            // console.log("Submit Post Data :: ", data.json());
            return data.json();
        });
    }

    // Profile save
    profileSave(postData:any) : any{
        this.actionUrl  =   this.Server + 'profile-update' ;
       
        return this.http.post(this.actionUrl, postData)
        .map(data => {
            data.json();
            return data.json();
        });
    }

    // Delete Records
    adminUserDelete(DelId : number) : any{
        let getToken    =   this._authServ.getLoginToken();
        this.actionUrl  =   this.Server + 'user-delete' ;
        return this.http.post(this.actionUrl, {id: DelId, token:getToken})
        .map(data => {
            data.json();
            // the console.log(...) line prevents your code from working 
            // either rem+ove it or add the line below (return ...)
            // console.log("Submit Post Data :: ", data.json());
            return data.json();
        });
    }
    
    //



}

