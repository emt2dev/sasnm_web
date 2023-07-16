import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from 'environment';
import { delay } from 'rxjs';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
import { Base__Cart } from 'src/app/shared/DTOs/Carts/Base__Cart';
import { Full__Cart } from 'src/app/shared/DTOs/Carts/Full__Cart';
import { shoppingCart } from 'src/app/shared/DTOs/Carts/shoppingCart';
import { Full__Company } from 'src/app/shared/DTOs/Companies/Full__Company';
import { Full__Product } from 'src/app/shared/DTOs/Products/Full__Product';
import { AuthService } from 'src/app/shared/authsvc/auth.service';
import { v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';
import { CompanyService } from 'src/app/shared/company/company.service';
import { v2_CompanyService } from 'src/app/shared/company/v2_company.service';
import { v2_CompanyDTO } from 'src/app/shared/v2_DTOs/v2_Company';
import { v2_CustomerDTO } from 'src/app/shared/v2_DTOs/v2_Customer';
import { v2_ProductDTO } from 'src/app/shared/v2_DTOs/v2_ProductStripe';
import { v2_ShoppingCartDTO } from 'src/app/shared/v2_DTOs/v2_ShoppingCart';
import { v2_StaffDTO } from 'src/app/shared/v2_DTOs/v2_Staff';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {
  private stripePromise?: Promise<Stripe | null>;
  
  v2_CustomerId = this.v2_authService.returnUserId()!;
  v2_Roles = this.v2_authService.returnRoles();

  StringsAreAMatch: number = 0;
  
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
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
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
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
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
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
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

  v2_Cart: v2_ShoppingCartDTO = {
    id: 0,
    companyId: 0,
    customerId: '...Loading...',
    items: [],
    cost: 0,
    submitted: false,
    abandoned: false,
    costInString: '...Loading...',
  };

  v2_Staff: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: false,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '',
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  v2_Customer: v2_CustomerDTO = {
    id: '...Loading...',
    name: '...Loading...',
    description: '...Loading...',
    addressStreet: '...Loading...',
    addressCity: '...Loading...',
    addressState: '...Loading...',
    addressPostal_Code: '...Loading...',
    currency: '...Loading...',
    livemode: false,
    password: '...Loading...',
    email: '...Loading...',
    phoneNumber: '',
    addressSuite: '',
    addressCountry: ''
  };

  v2_Products: Array<v2_ProductDTO> = [];

  FORM__ADD__TO__CART: FormGroup;

  constructor(public formBuilder: FormBuilder, private v2_authService: v2_AuthService, private v2_companyService: v2_CompanyService, private companyService: CompanyService, private router: Router) {
    this.FORM__ADD__TO__CART = this.formBuilder.group({
      productId: ['',]
    });
  }

  async ngOnInit(): Promise<void> {
    await delay(5000);

    const presentationId = 1;

    this.v2_companyService.v2_getCompanyDetails(presentationId).subscribe(async (data: v2_CompanyDTO) => {
      this.v2_Company = data;

      await this.v2_Company;
    });

    this.v2_companyService.v2_getAllCompanyProducts(presentationId).subscribe(async (data: Array<v2_ProductDTO>) => {
      this.v2_Products = data;

      await this.v2_Products;
    });

    this.v2_authService.v2_getCustomerProfile(this.v2_CustomerId).subscribe(async (data: v2_CustomerDTO) => {
      this.v2_Customer=data;

      await this.v2_Customer;
    });

    // this.v2_Customer = this.v2_authService.v2_displayCustomerDetails();
    // await this.v2_Customer;

    this.v2_Staff = this.v2_authService.v2_displayStaffDetails();
    await this.v2_Staff;
    
    await this.v2_companyService.v2_getCustomerCart(presentationId, this.v2_CustomerId).subscribe(async (data: v2_ShoppingCartDTO) => {
      this.v2_Cart = data;

      await this.v2_Cart;
    });
  }

  v2_EmptyCart(event: any) {
    // console.log(this.FORM__ADD__TO__CART.getRawValue())
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
    let j = elementId.match(/\d/g);
    j = j.join("");
    j = parseInt(j);
    let cartId: number = j;

    this.v2_companyService.v2_emptyCart(cartId).subscribe({
      next: (res) => {
        this.FORM__ADD__TO__CART.disable();
        this.FORM__ADD__TO__CART.reset();

        let presentationId = 1;
        this.v2_companyService.v2_getCustomerCart(presentationId, this.v2_CustomerId).subscribe(async (data: v2_ShoppingCartDTO) => {
        this.v2_Cart=data;
  
        await this.v2_Cart;
        });
      }
    })
  }

  async v2_CheckoutDelivery(event: any) {
    let publicApiKey = environment.stripe;
  
    let companyId: number = this.v2_Company.id;
  
    this.stripePromise = loadStripe(publicApiKey);
    const stripe = await this.stripePromise;
    this.v2_companyService.v2_newDeliveryOrder(companyId, this.v2_CustomerId).subscribe((response: string) => {            
      stripe?.redirectToCheckout({ sessionId: response });
    });
  }
  
  async v2_CheckoutTakeout(event: any) {
    let publicApiKey = environment.stripe;
  
    let companyId: number = this.v2_Company.id;
  
    this.stripePromise = loadStripe(publicApiKey);
    const stripe = await this.stripePromise;
    this.v2_companyService.v2_newTakeoutOrder(companyId, this.v2_CustomerId).subscribe((response: string) => {            
      stripe?.redirectToCheckout({ sessionId: response });
    });
  }

  v2_RemoveItemFromCart(event: any) {
    // console.log(this.FORM__ADD__TO__CART.getRawValue())
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
    let j = elementId.match(/\d/g);
    j = j.join("");
    j = parseInt(j);
    let productId: number = j;
    
    let customerId = this.v2_CustomerId;

    this.v2_companyService.v2_removeFromCart(productId, customerId)
    .subscribe({
      next: (res) => {
        this.FORM__ADD__TO__CART.disable();
        this.FORM__ADD__TO__CART.reset();
        
        let presentationId = 1;
        this.v2_companyService.v2_getCustomerCart(presentationId, customerId).subscribe(async (data: v2_ShoppingCartDTO) => {
          this.v2_Cart=data;
    
          await this.v2_Cart;
        });
      }
    })
  }

  v2_AddItemToCart(event: any) {
    // console.log(this.FORM__ADD__TO__CART.getRawValue())
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
    let j = elementId.match(/\d/g);
    j = j.join("");
    j = parseInt(j);
    let productId: number = j;
    
    let customerId = this.v2_CustomerId;

    this.v2_companyService.v2_addToCart(productId, customerId)
    .subscribe({
      next: (res) => {
        this.FORM__ADD__TO__CART.disable();
        this.FORM__ADD__TO__CART.reset();

        let presentationId = 1;
        this.v2_companyService.v2_getCustomerCart(presentationId, customerId).subscribe(async (data: v2_ShoppingCartDTO) => {
          this.v2_Cart=data;
    
          await this.v2_Cart;
        });
      }
    })
  }

  logout() { this.v2_authService.LOGOUT__USER(); this.router.navigateByUrl('/'); }
}
