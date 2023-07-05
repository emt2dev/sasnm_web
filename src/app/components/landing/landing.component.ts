import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
import { Base__Cart } from 'src/app/shared/DTOs/Carts/Base__Cart';
import { Full__Cart } from 'src/app/shared/DTOs/Carts/Full__Cart';
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

  Cart: Full__Cart = {
    id: '',
    customerId: '',
    companyId: 'default',
    productsList: [],
    total_Amount: 0.00,
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

  constructor(public formBuilder: FormBuilder, private authService: AuthService, private companyService: CompanyService, private router: Router) {
    
  }
  async ngOnInit(): Promise<void> {
    this.companyService.getCompanyDetails(1).subscribe(async (data: Full__Company) => {
      this.COMPANY__FOUND=data;

      await this.COMPANY__FOUND;
    });

    this.companyService.getCompanyProducts(1).subscribe(async (data: Array<Full__Product>) => {
      this.COMPANY__PRODUCTS=data;

      await this.COMPANY__PRODUCTS;
    });

    this.authService.getUserProfile(this.USER__ID).subscribe(async (data: Full__User) => {
      this.UserFound=data;

      await this.UserFound;
    });

    this.companyService.getUserCart(parseInt(this.COMPANY__FOUND.id), this.UserFound.email).subscribe(async (data: Full__Cart) => {
      this.Cart=data;

      await this.Cart;
    });

    this.UserFound = this.authService.getUserDetails();
  }
}
