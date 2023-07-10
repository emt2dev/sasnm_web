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

  CURRENT__CART: shoppingCart = {
    id: 0,
    customerId: '',
    companyId: '',
    items: [],
    cost: 0,
    abandoned: false,
    submitted: false,
  };

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

  FORM__ADD__TO__CART: FormGroup;

  constructor(public formBuilder: FormBuilder, private authService: AuthService, private companyService: CompanyService, private router: Router) {
    this.FORM__ADD__TO__CART = this.formBuilder.group({
      productId: ['',]
    });
  }
  async ngOnInit(): Promise<void> {
    let presentationId = 1;

    this.companyService.getCompanyDetails(presentationId).subscribe(async (data: Full__Company) => {
      this.COMPANY__FOUND=data;

      await this.COMPANY__FOUND;
    });

    this.companyService.getCompanyProducts(presentationId).subscribe(async (data: Array<Full__Product>) => {
      this.COMPANY__PRODUCTS=data;

      await this.COMPANY__PRODUCTS;
    });

    this.authService.getUserProfile(this.USER__ID).subscribe(async (data: Full__User) => {
      this.UserFound=data;

      await this.UserFound;
    });

    this.UserFound = this.authService.getUserDetails();

    this.companyService.getUserCart(presentationId, this.USER__ID).subscribe(async (data: shoppingCart) => {
      this.CURRENT__CART=data;

      await this.CURRENT__CART;

      this.CURRENT__CART.cost = parseFloat(this.CURRENT__CART.cost.toFixed(4));

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
