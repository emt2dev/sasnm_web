import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
import { Base__Cart } from 'src/app/shared/DTOs/Carts/Base__Cart';
import { Full__Cart } from 'src/app/shared/DTOs/Carts/Full__Cart';
import { shoppingCart } from 'src/app/shared/DTOs/Carts/shoppingCart';
import { Full__Company } from 'src/app/shared/DTOs/Companies/Full__Company';
import { Full__Product } from 'src/app/shared/DTOs/Products/Full__Product';
import { AuthService } from 'src/app/shared/authsvc/auth.service';
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
  USER__ID = this.authService.returnUserId()!;
  ROLES = this.authService.returnRoles();

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

  v2_Cart: v2_ShoppingCartDTO = {
    id: 0,
    companyId: 0,
    customerId: '...Loading...',
    Items: [],
    cost: 0,
    submitted: false,
    abandoned: false,
    constInString: '...Loading...',
  };

  CURRENT__CART: shoppingCart = {
    id: 0,
    customerId: '',
    companyId: '',
    items: [],
    cost: 0,
    abandoned: false,
    submitted: false,
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
  }

  UserFound: Full__User = {
    id: 'default',
    name: 'default',
    phoneNumber: 'default',
    companyId: 'default',
    isStaff: new Boolean,
    cartList: [],
    orderList: [],
    email: 'default',
    password: 'default',
  };

  COMPANY__PRODUCTS: Array<Full__Product> = [];
  v2_Products: Array<v2_ProductDTO> = [];

  FORM__ADD__TO__CART: FormGroup;

  constructor(public formBuilder: FormBuilder, private authService: AuthService, private v2_companyService: v2_CompanyService, private companyService: CompanyService, private router: Router) {
    this.FORM__ADD__TO__CART = this.formBuilder.group({
      productId: ['',]
    });
  }
  async ngOnInit(): Promise<void> {
    let presentationId = 1;

    this.v2_companyService.v2_getCompanyDetails(presentationId).subscribe(async (data: v2_CompanyDTO) => {
      this.v2_Company = data;

      await this.v2_Company;
    });

    // this.companyService.getCompanyDetails(presentationId).subscribe(async (data: Full__Company) => {
    //   this.COMPANY__FOUND=data;

    //   await this.COMPANY__FOUND;
    // });

    this.v2_companyService.v2_getAllCompanyProducts(presentationId).subscribe(async (data: Array<v2_ProductDTO>) => {
      this.v2_Products = data;

      await this.v2_Products;
    });

    // this.companyService.getCompanyProducts(presentationId).subscribe(async (data: Array<Full__Product>) => {
    //   this.COMPANY__PRODUCTS=data;

    //   await this.COMPANY__PRODUCTS;
    // });

    this.authService.getUserProfile(this.USER__ID).subscribe(async (data: Full__User) => {
      this.UserFound=data;

      await this.UserFound;
    });

    this.UserFound = this.authService.getUserDetails();
    // this.v2_Customer = this.authService.getUserDetails();

    this.companyService.getUserCart(presentationId, this.USER__ID).subscribe(async (data: shoppingCart) => {
      this.CURRENT__CART=data;

      await this.CURRENT__CART;

      this.CURRENT__CART.cost = parseFloat(this.CURRENT__CART.cost.toFixed(4));

    });

    this.v2_companyService.v2_getCustomerCart(presentationId, this.v2_Customer.id).subscribe(async (data: v2_ShoppingCartDTO) => {
      this.v2_Cart = data;

      await this.v2_Cart;
    });
  }

  TRUNCATE(event: any) {
        // console.log(this.FORM__ADD__TO__CART.getRawValue())
        let element = event.target || event.srcElement || event.currentTarget;
        let elementId = element.id;
        let j = elementId.match(/\d/g);
        j = j.join("");
        j = parseInt(j);
        let cartId: number = j;
    
        this.companyService.truncateCart(cartId).subscribe({
          next: (res) => {
            this.FORM__ADD__TO__CART.disable();
            this.FORM__ADD__TO__CART.reset();

            let presentationId = 1;
            this.companyService.getUserCart(presentationId, this.USER__ID).subscribe(async (data: shoppingCart) => {
            this.CURRENT__CART=data;
      
            await this.CURRENT__CART;

            this.CURRENT__CART.cost = parseFloat(this.CURRENT__CART.cost.toFixed(4));
          });
        }
      })
  }

  CHECKOUT(event: any) {
    let i: number = parseInt(this.COMPANY__FOUND.id);
    // here we attempt to reach our api for checking out
    this.companyService.submitOrder(i, this.UserFound.id).subscribe({
      next: (res) => {
        this.router.navigateByUrl("success");
      }
    });
  
    // generic stripe payment link with static elements is below
    // window.location.href = "https://buy.stripe.com/bIY7sJ62O7wz1dmfZ1";
  }

  REMOVE__ONE(event: any) {
    // console.log(this.FORM__ADD__TO__CART.getRawValue())
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
    let j = elementId.match(/\d/g);
    j = j.join("");
    j = parseInt(j);
    let productId: number = j;
    
    let customerId = this.UserFound.id;

    this.companyService.removeFromCart(productId, customerId)
    .subscribe({
      next: (res) => {
        this.FORM__ADD__TO__CART.disable();
        this.FORM__ADD__TO__CART.reset();
        
        let presentationId = 1;
        this.companyService.getUserCart(presentationId, this.USER__ID).subscribe(async (data: shoppingCart) => {
          this.CURRENT__CART=data;
    
          await this.CURRENT__CART;
          
          this.CURRENT__CART.cost = parseFloat(this.CURRENT__CART.cost.toFixed(4));
        });
      }
    })
  }

  ADD__TO__CART(event: any) {
    // console.log(this.FORM__ADD__TO__CART.getRawValue())
    let element = event.target || event.srcElement || event.currentTarget;
    let elementId = element.id;
    let j = elementId.match(/\d/g);
    j = j.join("");
    j = parseInt(j);
    let productId: number = j;
    
    let customerId = this.UserFound.id;

    this.companyService.addToCart(productId, customerId)
    .subscribe({
      next: (res) => {
        this.FORM__ADD__TO__CART.disable();
        this.FORM__ADD__TO__CART.reset();

        let presentationId = 1;
        this.companyService.getUserCart(presentationId, this.USER__ID).subscribe(async (data: shoppingCart) => {
          this.CURRENT__CART=data;
    
          await this.CURRENT__CART;

          this.CURRENT__CART.cost = parseFloat(this.CURRENT__CART.cost.toFixed(4));
        });
      }
    })
  }
}
