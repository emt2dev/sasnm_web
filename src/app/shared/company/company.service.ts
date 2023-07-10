import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Full__Company } from '../DTOs/Companies/Full__Company';
import { Full__Product } from '../DTOs/Products/Full__Product';
import { Full__Cart } from '../DTOs/Carts/Full__Cart';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  COMPANY__FOUND: Full__Company = {
    id_admin_one: '',
    id_admin_two: '',
    staffList: [],
    products: [],
    orders: [],
    carts: [],
    id: '',
    name: '',
    description: '',
    address: '',
    phoneNumber: ''
  };

  _authreadyapi__COMPANY__GET__DETAILS: string = 'http://localhost:5035/api/company/details';
  _authreadyapi__PRODUCT__COMPANY__ALL: string = 'http://localhost:5035/api/product/list/all';

  _authreadyapi__CART__GET__EXISTING: string = 'http://localhost:5035/api/shoppingCart/existing';
  _authreadyapi__CART__ADD__ONE: string = 'http://localhost:5035/api/shoppingCart/add';

  _authreadyapi__CART__TRUNCATE: string = 'http://localhost:5035/api/shoppingCart/empty';
  _authreadyapi__CART__REMOVE__ONE: string = 'http://localhost:5035/api/shoppingCart/remove';

  _authreadyapi__ORDER__CHECKOUT: string = 'http://localhost:5035/api/order/submit/pickup';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient, public router: Router) {
      
   }

  getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get<Full__Company>(`${this._authreadyapi__COMPANY__GET__DETAILS}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  getCompanyProducts(companyId: number): Observable<any> {
    return this.http.get<Array<Full__Product>>(`${this._authreadyapi__PRODUCT__COMPANY__ALL}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  getUserCart(companyId: any, userId: string): Observable<any> {
    let company = parseInt(companyId);
    return this.http.post<Full__Cart>(`${this._authreadyapi__CART__GET__EXISTING}/${companyId}/${userId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  addToCart(productId: number, userId: string): Observable<any> {
    return this.http.post(`${this._authreadyapi__CART__ADD__ONE}/${productId}/${userId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  truncateCart(cartId: number): Observable<any> {
    return this.http.post(`${this._authreadyapi__CART__TRUNCATE}/${cartId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  removeFromCart(productId: number, customerId: string): Observable<any> {
    return this.http.post(`${this._authreadyapi__CART__REMOVE__ONE}/${productId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  submitOrder(companyId: number, customerId: string): Observable<any> {
    return this.http.post(`${this._authreadyapi__ORDER__CHECKOUT}/${companyId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError));
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
