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
import { Base__Company } from '../DTOs/Companies/Base__Company';
import { overrideDTO } from '../DTOs/overrideDTo';
import { v2_StaffDTO } from '../v2_DTOs/v2_Staff';
import { v2_CustomerDTO } from '../v2_DTOs/v2_Customer';
import { v2_CompanyDTO } from '../v2_DTOs/v2_Company';

export const TOKEN: string = 'TOKEN';
export const USER_ID: string = 'USER_ID';
export const REFRESH_TOKEN: string = 'REFRESH_TOKEN';
export const ROLES: string = 'ROLES';
export const DECODED_TOKEN: string = 'DECODED_TOKEN';
export const STAFF: string = "false";

export interface decodedUser {
  Token: string;
  UserId: string;
  Roles: string;
  RefreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class v2_AuthService {
  private user: BehaviorSubject<decodedUser | null | undefined> = new BehaviorSubject<decodedUser | null | undefined>(undefined);

    /* AuthReadyAPI V2 API End Points */
  // api builder
  _api: string = 'http://localhost:5035/api/v2.0';

  // logins
  _customerLogin: string = 'entry/customer';
  _developerLogin: string = 'entry/developer';
  _staffLogin: string = 'entry/staff';

   // details
   _customerDetails: string = 'customers/details';
   _companyDetails: string = 'company/details';
   _productDetails: string = 'products/all';

  // refresh jwt on init if user not logged in.
  _verifyRefreshToken: string = 'entry/refresh';

  // registrations
  _customerRegister: string = 'entry/register/customer';
  _staffRegister: string = 'entry/register/staff';
  _developerRegister1: string = 'entry/register/developer';
  _developerRegister2: string = 'developers/new/dev';

  // create company, update admin (using overrideDTO)
  _newCompany: string = 'developers/new/company';
  _updateAdmin: string = 'developers/update/admin';

  headers = new HttpHeaders().set('Content-Type', 'application/json');


  v2_Customer: v2_CustomerDTO = {
    id: '...Loading...',
    name: '...Loading...',
    description: '...Loading...',
    addressStreet: '...Loading...',
    addressCity: ',...Loading...',
    addressState: '...Loading...',
    addressPostal_Code: '...Loading...',
    currency: '...Loading...',
    livemode: false,
    password: '...Loading...',
    email: '...Loading...',
  }

  v2_Staff: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: false,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: ''
  }

  v2_Owner: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: true,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...',
  };

  v2_AdministratorOne: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: true,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...',
  };

  v2_AdministratorTwo: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: true,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...',
  };

  v2_Company: v2_CompanyDTO = {
    id: 0,
    name: '...Loading...',
    description: '...Loading...',
    phoneNumber: '...Loading...',
    addressStreet: '...Loading...',
    addressSuite: '...Loading...',
    addressCity: '...Loading...',
    addressState: '...Loading...',
    addressPostal_Code: '...Loading...',
    addressCountry: '...Loading...',
    smallTagline: '...Loading...',
    menuDescription: '...Loading...',
    headerImage: '...Loading...',
    aboutUsImageUrl: '...Loading...',
    locationImageUrl: '...Loading...',
    logoImageUrl: '...Loading...',
    miscImageUrl: '...Loading...',
    listOfAllProducts: [],
    owner: this.v2_Owner,
    administratorOne: this.v2_AdministratorOne,
    administratorTwo: this.v2_AdministratorTwo
  };

  private DTO_override: overrideDTO = {
    userEmail: '',
    companyId: 0,
    replaceAdminOneOrTwo: 1,
  };

  v2_displayStaffDetails() {
    return this.v2_Staff;
  }

  v2_displayCustomerDetails() {
    return this.v2_Customer;
  }

  v2_displayCompanyDetails() {
    return this.v2_Company;
  }
  
  constructor(private http: HttpClient, public router: Router) {
    this.loadUserDetails();
  }

  loadUserDetails() {
    const token = localStorage.getItem(TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(token && refreshToken) {

      const decoded: any = jwt_decode<JwtPayload>(token);
      console.log(decoded);
      const decodedUser: decodedUser = {
        Token: token,
        UserId: decoded.sub,
        Roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        RefreshToken: refreshToken
      };

      this.user.next(decodedUser);
    } else {
      this.user.next(null);
    }
  }

  v2_registerCustomer(user:Base__User): Observable<any> {
    return this.http.post(`${this._api}/${this._customerRegister}`, user).pipe(catchError(this.handleError));
  }

  v2_registerStaff(user:Base__User): Observable<any> {
    return this.http.post(`${this._api}/${this._staffRegister}`, user).pipe(catchError(this.handleError));
  }

  v2_registerDev_Entry(user:Base__User): Observable<any> {
    return this.http.post(`${this._api}/${this._developerRegister1}`, user).pipe(catchError(this.handleError));
  }

  v2_registerDev_Dev(user:Base__User): Observable<any> {
    return this.http.post(`${this._api}/${this._developerRegister2}`, user).pipe(catchError(this.handleError));
  }

  v2_NewCompany(newCompany:v2_CompanyDTO): Observable<any> {
    return this.http.post(`${this._api}/${this._newCompany}`, newCompany).pipe(catchError(this.handleError));
  }
    
  v2_LoginCustomer(user:Base__User) {
    return this.http
      .post<Base__User>(`${this._api}/${this._customerLogin}`, user)
      .pipe(
        map((res: any) => {

          let i = localStorage.setItem(TOKEN, res.token);
          
          i = localStorage.setItem(REFRESH_TOKEN, res.userId);

          const decoded: any = jwt_decode<JwtPayload>(res.token);

          i = localStorage.setItem(DECODED_TOKEN, decoded)
          i = localStorage.setItem(USER_ID, decoded.uid);
          i = localStorage.setItem(ROLES, decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

          console.log(decoded);
          const decodedUser: decodedUser = {
            Token: res.token,
            UserId: decoded.sub,
            Roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            RefreshToken: res.refreshToken
          };

          this.user.next(decodedUser);
          return decodedUser;
        })
      );
  }

  v2_LoginStaff(user:Base__User) {
    return this.http
      .post<Base__User>(`${this._api}/${this._staffLogin}`, user)
      .pipe(
        map((res: any) => {

          let i = localStorage.setItem(TOKEN, res.token);
          
          i = localStorage.setItem(REFRESH_TOKEN, res.userId);

          const decoded: any = jwt_decode<JwtPayload>(res.token);

          i = localStorage.setItem(DECODED_TOKEN, decoded)
          i = localStorage.setItem(USER_ID, decoded.uid);
          i = localStorage.setItem(ROLES, decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
          i = localStorage.setItem(STAFF, "true");

          console.log(decoded);
          const decodedUser: decodedUser = {
            Token: res.token,
            UserId: decoded.sub,
            Roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            RefreshToken: res.refreshToken
          };

          this.user.next(decodedUser);
          return decodedUser;
        })
      );
  }

  v2_LoginDeveloper(user:Base__User) {
    return this.http
      .post<Base__User>(`${this._api}/${this._developerLogin}`, user)
      .pipe(
        map((res: any) => {

          let i = localStorage.setItem(TOKEN, res.token);
          
          i = localStorage.setItem(REFRESH_TOKEN, res.userId);

          const decoded: any = jwt_decode<JwtPayload>(res.token);

          i = localStorage.setItem(DECODED_TOKEN, decoded)
          i = localStorage.setItem(USER_ID, decoded.uid);
          i = localStorage.setItem(ROLES, decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

          console.log(decoded);
          const decodedUser: decodedUser = {
            Token: res.token,
            UserId: decoded.sub,
            Roles: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            RefreshToken: res.refreshToken
          };

          this.user.next(decodedUser);
          return decodedUser;
        })
      );
  }

  v2_overrideAdmin(DTO: overrideDTO): Observable<any>{
    return this.http.post(`${this._api}/${this._updateAdmin}`, DTO, { headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  v2_getCustomerProfile(id: string): Observable<any>{
    return this.http.post(`${this._api}/${this._customerDetails}/${id}`, { headers:this.headers })
    .pipe(catchError(this.handleError))
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