import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { v2_CompanyDTO } from '../v2_DTOs/v2_Company';
import { v2_ProductDTO } from '../v2_DTOs/v2_ProductStripe';
import { v2_ShoppingCartDTO } from '../v2_DTOs/v2_ShoppingCart';
import { v2_OrderDTO } from '../v2_DTOs/v2_Order';
import { v2_StaffDTO } from '../v2_DTOs/v2_Staff';
import { v2_newProductDTO } from '../DTOs/Products/v2_newProductDTO';

@Injectable({
  providedIn: 'root'
})

export class v2_CompanyService {

  Owner: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: true,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...',
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  AdministratorOne: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: true,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...',
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  AdministratorTwo: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: true,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...',
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  Company: v2_CompanyDTO = {
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
    owner: this.Owner,
    administratorOne: this.AdministratorOne,
    administratorTwo: this.AdministratorTwo
  };

  /* AuthReadyAPI V2 API End Points */
  // api builder
  _api: string = 'http://localhost:5035/api/v2';

  // staff end points
  _getStaffList: string = 'staff/all';
  _getNonAdmins: string = 'staff/nonadmins';
  _getAdmins: string = 'staff/admins';

  // Company End Points
  _getCompanyDetails: string = 'company/details';
  _updateCompanyDetails: string = 'company/update';
  _giveAdmin: string = 'company/giveAdmin';
  _removeAdmin: string = 'company/removeAdmin';

  // Products End Points
  _getAllProductsFromCompany: string = 'products/all';
  _getProductDetails: string = 'products/details';
  _createNewProduct: string = 'products/create';
  _updateProduct: string = 'products/update';
  _updateProductImage: string = 'products/update/image';
  _deleteProduct: string = 'products/delete';
  
  // Shopping Cart End Points
  _getCart: string = 'shoppingCart/existing';
  _addToCart: string = 'shoppingCart/add';
  _removeFromCart: string = 'shoppingCart/remove';
  _emptyCart: string = 'shoppingCart/empty';

  // Order End Points
  _newOrderDelivery: string = 'orders/submit/delivery';
  _newOrderTakeout: string = 'orders/submit/takeout';

  _getAllCustomerOrders: string = 'orders/all';
  _getActiveCustomerOrders: string = 'orders/active';
  _getCompletedCustomerOrders: string = 'orders/completed';

  _getAllCompanyOrders: string = 'orders/company/all';
  _getActiveCompanyOrders: string = 'orders/company/active';
  _getCompletedCompanyOrders: string = 'orders/company/completed';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient, public router: Router) {
      
   }

  
  v2_returnNewProductURL(){
    let builder = `${this._api}/${this._createNewProduct}`;
    return builder;
  }

  /**** COMPANY CALLS */
  v2_getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get<v2_CompanyDTO>(`${this._api}/${this._getCompanyDetails}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_getStaffList(companyId: number): Observable<any> {
    return this.http.get<Array<v2_StaffDTO>>(`${this._api}/${this._getStaffList}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_getNonAdminList(companyId: number): Observable<any> {
    return this.http.get<Array<v2_StaffDTO>>(`${this._api}/${this._getNonAdmins}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_getAdminList(companyId: number): Observable<any> {
    return this.http.get<Array<v2_StaffDTO>>(`${this._api}/${this._getAdmins}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_updateCompanyDetails(sendingDTO: v2_CompanyDTO): Observable<any> {
    return this.http.put<v2_CompanyDTO>(`${this._api}/${this._updateCompanyDetails}`, sendingDTO, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_giveAdmin(adminEmail: string, companyId: number): Observable<any> {
    return this.http.put<v2_CompanyDTO>(`${this._api}/${this._giveAdmin}/${companyId}`, adminEmail, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_removeAdmin(adminEmail: string, companyId: number): Observable<any> {
    return this.http.put<v2_CompanyDTO>(`${this._api}/${this._removeAdmin}/${companyId}`, adminEmail, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  /**** PRODUCT CALLS */
  v2_getAllCompanyProducts(companyId: number): Observable<any> {
    return this.http.get<Array<v2_ProductDTO>>(`${this._api}/${this._getAllProductsFromCompany}/${companyId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_getProductDetails(productId: number): Observable<any> {
    return this.http.get<v2_ProductDTO>(`${this._api}/${this._getProductDetails}/${productId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_newProduct(sendingDTO: v2_newProductDTO): Observable<any> {
    return this.http.post<v2_newProductDTO>(`${this._api}/${this._createNewProduct}`, sendingDTO, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_newProductFormData(sendingDTO: FormData): Observable<any> {
    return this.http.post<v2_newProductDTO>(`${this._api}/${this._createNewProduct}`, sendingDTO, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_updateProduct(sendingDTO: v2_ProductDTO): Observable<any> {
    return this.http.put(`${this._api}/${this._updateProduct}`, sendingDTO, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_updateProductImage(form: FormData, productId: number) {
    return this.http.post(`${this._api}/${this._updateProductImage}/${productId}`, form, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  v2_deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this._api}/${this._deleteProduct}/${productId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  }

  /***** SHOPPING CART CALLS */
  v2_getCustomerCart(companyId: any, customerId: string): Observable<any> {
    let company = parseInt(companyId);
    return this.http.post<v2_ShoppingCartDTO>(`${this._api}/${this._getCart}/${companyId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_addToCart(productId: number, customerId: string): Observable<any> {
    return this.http.post(`${this._api}/${this._addToCart}/${productId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_removeFromCart(productId: number, customerId: string): Observable<any> {
    return this.http.post(`${this._api}/${this._removeFromCart}/${productId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_emptyCart(cartId: number): Observable<any> {
    return this.http.post(`${this._api}/${this._emptyCart}/${cartId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  /*** ORDER CALLS */
  v2_newDeliveryOrder(companyId: number, customerId: string): Observable<any> {
    return this.http.post<string>(`${this._api}/${this._newOrderDelivery}/${companyId}/${customerId}`, {headers:this.headers});
  };

  v2_newTakeoutOrder(companyId: number, customerId: string): Observable<any> {
    return this.http.post<string>(`${this._api}/${this._newOrderTakeout}/${companyId}/${customerId}`, {headers:this.headers});
  };

  v2_getAllCustomerOrders(companyId: number, customerId: string): Observable<any> {
    return this.http.get<Array<v2_OrderDTO>>(`${this._api}/${this._getAllCustomerOrders}/${companyId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_getActiveCustomerOrders(companyId: number, customerId: string): Observable<any> {
    return this.http.get<Array<v2_OrderDTO>>(`${this._api}/${this._getActiveCustomerOrders}/${companyId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_getCompletedCustomerOrders(companyId: number, customerId: string): Observable<any> {
    return this.http.get<Array<v2_OrderDTO>>(`${this._api}/${this._getCompletedCustomerOrders}/${companyId}/${customerId}`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_getAllCompanyOrders(companyId: number): Observable<any> {
    return this.http.get<Array<v2_OrderDTO>>(`${this._api}/${this._getAllCompanyOrders}/${companyId}/`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_getActiveCompanyOrders(companyId: number): Observable<any> {
    return this.http.get<Array<v2_OrderDTO>>(`${this._api}/${this._getActiveCompanyOrders}/${companyId}/`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

  v2_getCompletedCompanyOrders(companyId: number): Observable<any> {
    return this.http.get<Array<v2_OrderDTO>>(`${this._api}/${this._getCompletedCompanyOrders}/${companyId}/`, {headers:this.headers}).pipe(catchError(this.handleError))
  };

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
