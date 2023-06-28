import { Injectable } from '@angular/core';
import { Full__User } from '../DTOs/APIUsers/Full__APIUser';
import { Base__User } from '../DTOs/APIUsers/Base__APIUser';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import jwt_decode, { JwtPayload } from "jwt-decode";

import { Router } from '@angular/router';
import { AuthResponseDTO } from '../DTOs/authResponse';
import { DecodedAuthResponse } from '../DTOs/decodedAuthResponse';

export const TOKEN: string = 'TOKEN';
export const USER_ID: string = 'USER_ID';
export const REFRESH_TOKEN: string = 'REFRESH_TOKEN';
export const ROLES: string = 'ROLES';
export const DECODED_TOKEN: string = 'DECODED_TOKEN';

export interface decodedUser {
  Token: string;
  UserId: string;
  Roles: string;
  RefreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<decodedUser | null | undefined> = new BehaviorSubject<decodedUser | null | undefined>(undefined);

  _authreadyapi__REGISTER: string = 'http://localhost:5035/api/auth/register';
  _authreadyapi__LOGIN: string = 'http://localhost:5035/api/auth/login';
  _authreadyapi__USER__DETAILS: string = 'http://localhost:5035/api/user/details';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private UserDetails: Full__User = {
    id: '',
    Name: '',
    PhoneNumber: '',
    CompanyId: '',
    IsStaff: false,
    CartList: [],
    OrderList: [],
    Email: '',
    Password: '',
  };

  getUserDetails() {
    return this.UserDetails;
  }
  
  constructor(private http: HttpClient, public router: Router) {
    this.loadUserDetails();
  }

  loadUserDetails() {
    const token = localStorage.getItem(TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(token && refreshToken) {

      const decoded: any = jwt_decode<JwtPayload>(token);

      const decodedUser: decodedUser = {
        Token: token,
        UserId: decoded.sub,
        Roles: decoded.roles,
        RefreshToken: refreshToken
      };

      this.user.next(decodedUser);
    } else {
      this.user.next(null);
    }
  }

  // register customer account
  REGISTER__USER(user:Base__User): Observable<any> {
    return this.http.post(this._authreadyapi__REGISTER, user).pipe(catchError(this.handleError));
  }
  
  // login account (working)
  
  LOGIN__USER(user:Base__User) {
    return this.http
      .post<Base__User>(this._authreadyapi__LOGIN, user)
      .pipe(
        map((res: any) => {
          console.log("result: ", res);

          let i = localStorage.setItem(TOKEN, res.token);
          
          i = localStorage.setItem(REFRESH_TOKEN, res.userId);

          const decoded: any = jwt_decode<JwtPayload>(res.token);
          i = localStorage.setItem(DECODED_TOKEN, decoded)
          i = localStorage.setItem(USER_ID, decoded.uid);
          i = localStorage.setItem(ROLES, decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

          const decodedUser: decodedUser = {
            Token: res.token,
            UserId: decoded.sub,
            Roles: decoded.Roles,
            RefreshToken: res.refreshToken
          };

          this.user.next(decodedUser);
          return decodedUser;
        })
      );
      // .subscribe((res: any) => {
      //   localStorage.setItem('token', res.token);
      //   localStorage.setItem('refreshToken', res.refreshToken);
      //   localStorage.setItem('userId', res.userId);

      //   const decoded: any = jwt_decode<JwtPayload>(res.token);
      //   localStorage.setItem('decodedtoken', decoded);

      //   const decodedUser = new DecodedAuthResponse(decoded.sub,  decoded, res.refreshToken, decoded.roles);

      //   // this.getUserProfile(res.userId).subscribe((res) => {
      //   //   this.currentUser = res;
      //   //   this.router.navigate(['dashboard']);
      //   // });

      //   // this.user.next(decodedUser);
      //   return JSON.stringify(decodedUser);
      // });
  }

  returnUserId() {
    return localStorage.getItem(USER_ID);
  }

  returnRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  returnRoles() {
    return localStorage.getItem(ROLES);
  }

  returnToken() {
    return localStorage.getItem(TOKEN);
  }

  get isUserLoggedIn(): boolean {
    let validToken = localStorage.getItem(TOKEN);
    return validToken !== null ? true : false;
  }

  LOGOUT__USER() {
    let logoutActions = localStorage.removeItem(TOKEN);
    logoutActions = localStorage.removeItem(USER_ID);
    logoutActions = localStorage.removeItem(DECODED_TOKEN);
    logoutActions = localStorage.removeItem(ROLES);
    
    if (logoutActions == null) {
      this.router.navigate(['']);
    }
  }

  getUserProfile(id: string): Observable<any>{
    return this.http.post(`${this._authreadyapi__USER__DETAILS}/${id}`, { headers:this.headers })
    .pipe(catchError(this.handleError))
  }
  // //Full__User profile
  // getUserProfile(id: string): Observable<Full__User> {
  //     let userid = this.returnUserId();
  //     let api = `${this._authreadyapi__USER__DETAILS}/${userid}`;
  //     return this.http.post<Full__User>(api, userid, { headers: this.headers }).pipe(
  //       map((user: Full__User) => {
  //         this.UserDetails = user;
  //         this.UserDetails.Id = user.Id,
  //         this.UserDetails.Name = user.Name,
  //         this.UserDetails.PhoneNumber = user.PhoneNumber,
  //         this.UserDetails.CompanyId = user.CompanyId,
  //         this.UserDetails.IsStaff = user.IsStaff,
  //         this.UserDetails.CartList = user.CartList,
  //         this.UserDetails.OrderList = user.OrderList,
  //         this.UserDetails.Email = user.Email,
  //         this.UserDetails.Password = '' 
  //         return this.UserDetails;
  //       })
  //     )
  //   };

    // getUserProfile(id: string): Observable<any> {
    //   let userid = this.returnUserId();
    //   let api = `${this._authreadyapi__USER__DETAILS}/${userid}`;
    //   return this.http.post<Full__User>(api, userid, { headers: this.headers }).pipe(
    //     map((user: Full__User) => {
    //       this.UserDetails = user;

    //       return this.UserDetails;
    //     })
    //   )
    // };

  // getUserProfile(id: string): Observable<Full__User> {
  //   let userid = this.returnUserId();
  //   let api = `${this._authreadyapi__USER__DETAILS}/${userid}`;
  //   return this.http.post<Full__User>(api, userid, { headers: this.headers }).pipe(
  //     switchMap((DTO: Full__User): Full__User => {
  //       if(DTO) {
  //         this.UserDetails.Id = DTO.Id,
  //         this.UserDetails.Name = DTO.Name,
  //         this.UserDetails.PhoneNumber = DTO.PhoneNumber,
  //         this.UserDetails.CompanyId = DTO.CompanyId,
  //         this.UserDetails.IsStaff = DTO.IsStaff,
  //         this.UserDetails.CartList = DTO.CartList,
  //         this.UserDetails.OrderList = DTO.OrderList,
  //         this.UserDetails.Email = DTO.Email,
  //         this.UserDetails.Password = ''  
  //       } else {
  //         this.UserDetails.Id = '',
  //         this.UserDetails.Name = '',
  //         this.UserDetails.PhoneNumber = '',
  //         this.UserDetails.CompanyId = '',
  //         this.UserDetails.IsStaff = true,
  //         this.UserDetails.CartList = [],
  //         this.UserDetails.OrderList = [],
  //         this.UserDetails.Email = '',
  //         this.UserDetails.Password = ''
  //       }
  //     }
  //   ));
  // };

  // //Full__User profile
  // getUserProfile(id: string): Observable<any> {
  // // getUserProfile(id: string) {
  //   let userid = this.returnUserId();
  //   let api = `${this._authreadyapi__USER__DETAILS}/${userid}`;
  //   return this.http.post(api, userid, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res || {};
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}Message: ${error.message}`;
    }
    return msg;
  }
}