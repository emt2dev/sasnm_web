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
import { Base__Company } from '../DTOs/Companies/Base__Company';
import { overrideDTO } from '../DTOs/overrideDTo';
import { Base__Product } from '../DTOs/Products/Base__Product';
import { Full__Product } from '../DTOs/Products/Full__Product';
import { Full__Company } from '../DTOs/Companies/Full__Company';
import { newProductDTO } from '../DTOs/Products/newProductDTO';
import { Base__Cart } from '../DTOs/Carts/Base__Cart';

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
  _authreadyapi__API__ADMIN__USER: string = 'http://localhost:5035/api/admin/admin__create';
  _authreadyapi__API__ADMIN__COMPANY: string = 'http://localhost:5035/api/admin/company__create';
  _authreadyapi__COMPANY__ADMIN__OVERRIDE: string = 'http://localhost:5035/api/admin/company__admin__override';

  _authreadyapi__COMPANY__GET__ALL: string = 'http://localhost:5035/api/company/all';
  _authreadyapi__COMPANY__GET__DETAILS: string = 'http://localhost:5035/api/company/details';

  _authreadyapi__COMPANY__NEW__PRODUCT: string = 'http://localhost:5035/api/company/new__product';
  _authreadyapi__COMPANY__UPDATE__PRODUCT: string = 'http://localhost:5035/api/company/update__product';
  _authreadyapi__COMPANY__DELETE__PRODUCT: string = 'http://localhost:5035/api/company/delete__product';

  _authreadyapi__PRODUCT__COMPANY__ALL: string = 'http://localhost:5035/api/product/list/all';

  
  _authreadyapi__CART__GET__EXISTING: string = 'http://localhost:5035/api/cart/existing';

  returnNewProductURL() {
    return this._authreadyapi__COMPANY__NEW__PRODUCT;
  }
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private UserDetails: Full__User = {
    id: '',
    name: 'name',
    phoneNumber: '',
    companyId: '',
    isStaff: false,
    cartList: [],
    orderList: [],
    email: '',
    password: '',
  };

  private DTO_Company: Base__Company = {
    id: '',
    name: '',
    phoneNumber: '',
    description: '',
    address: '',
  };

  private DTO_override: overrideDTO = {
    userEmail: '',
    companyId: 0,
    replaceAdminOneOrTwo: 1,
  };

  private FullCompanyList: Array<Base__Company> = [];

  getFullCompanyList() {
    // let list: any = this.getAllCompanies();
    // this.pushAllCompanies(list);
    return this.FullCompanyList;
  }

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

  // register customer account
  REGISTER__USER(user:Base__User): Observable<any> {
    return this.http.post(this._authreadyapi__REGISTER, user).pipe(catchError(this.handleError));
  }

  // register api admin account
  REGISTER__API__ADMIN(apiAdmin:Base__User): Observable<any> {
    return this.http.post(this._authreadyapi__API__ADMIN__USER, apiAdmin).pipe(catchError(this.handleError));
  }

    // register customer account
    CREATE__COMPANY(newCompany:Base__Company): Observable<any> {
      return this.http.post(this._authreadyapi__API__ADMIN__COMPANY, newCompany).pipe(catchError(this.handleError));
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

  // this works so we're saving it
  // getAllCompanies(): Observable<any> {
  //   return this.http.get(this._authreadyapi__COMPANY__GET__ALL, {headers:this.headers}).pipe(catchError(this.handleError))
  // }

  // getAllCompanies(): Observable<any> {
  //   return this.http.get<Array<Base__Company>>(this._authreadyapi__COMPANY__GET__ALL, {headers:this.headers}).pipe(catchError(this.handleError))
  // }

  getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get<Full__Company>(`${this._authreadyapi__COMPANY__GET__DETAILS}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  getAllProductFromCompany(companyId: number): Observable<any> {
    return this.http.get<Array<Full__Product>>(`${this._authreadyapi__PRODUCT__COMPANY__ALL}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  overrideAdmin(DTO: overrideDTO): Observable<any>{
    return this.http.post(`${this._authreadyapi__COMPANY__ADMIN__OVERRIDE}`, DTO, { headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this._authreadyapi__COMPANY__DELETE__PRODUCT}/${productId}`,  { headers:this.headers }).pipe(catchError(this.handleError))
  }

  updateProduct(DTO: Base__Product): Observable<any>{
    return this.http.post(`${this._authreadyapi__COMPANY__NEW__PRODUCT}`, DTO, { headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  createProduct(DTO: newProductDTO): Observable<any>{
    return this.http.post(`${this._authreadyapi__COMPANY__NEW__PRODUCT}`, DTO, { headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  returnCurrentCart(companyId: number, userEmail: string): Observable<Base__Cart> {
    return this.http.post<Base__Cart>(`${this._authreadyapi__CART__GET__EXISTING}/${companyId}`, userEmail, { headers:this.headers })
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