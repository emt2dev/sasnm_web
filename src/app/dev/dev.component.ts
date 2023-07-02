import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
import { Base__Cart } from 'src/app/shared/DTOs/Carts/Base__Cart';
import { Base__Company } from 'src/app/shared/DTOs/Companies/Base__Company';
import { overrideDTO } from 'src/app/shared/DTOs/overrideDTo';
import { AuthService } from 'src/app/shared/authsvc/auth.service';
import { Base__Product } from '../shared/DTOs/Products/Base__Product';
import { Full__Product } from '../shared/DTOs/Products/Full__Product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})

export class DevComponent  implements OnInit {
  private user: BehaviorSubject<Full__User | null | undefined> = new BehaviorSubject<Full__User | null | undefined>(undefined);

  FORM__API__ADMIN__REGISTER: FormGroup;
  FORM__API__ADMIN__CREATE__COMPANY: FormGroup;
  FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN: FormGroup;
  
  FORM__COMPANY__ADD__ADMIN: FormGroup;
  FORM__COMPANY__DELETE__ADMIN: FormGroup;

  FORM__COMPANY__CREATE__PRODUCT: FormGroup;
  FORM__COMPANY__UPDATE__PRODUCT: FormGroup;
  FORM__COMPANY__DELETE__PRODUCT: FormGroup;

  USER__ID = this.authsvc.returnUserId()!;
  ROLES = this.authsvc.returnRoles();

  // COMPANY__LIST: Array<Base__Company> = [];
  COMPANY__LIST: Array<any> = [];
  
  UserFound: dto__full__user = {
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

  CURRENT__CART: Base__Cart = {
    id: '',
    customerId: '',
    companyId: '',
    productsList: [],
    total_Amount: 0,
    abandoned: false,
    submitted: false,
  };

  NewProduct: Base__Product = {
    id: '',
    name: '',
    price_Normal: 0,
    price_Sale: 0,
    imageURL: '',
    companyId: '',
    keyword: ''
  };

  ProductFound: Full__Product = {
    id: '',
    name: '',
    price_Normal: 0,
    price_Sale: 0,
    imageURL: '',
    companyId: '',
    keyword: '',
    description: '',
    price_Current: 0,
    modifiers: ''
  };

  PRODUCT__LIST: Array<any> = [];


  constructor(public formBuilder: FormBuilder, private authsvc: AuthService, private actRoute: ActivatedRoute, private router: Router){
          this.FORM__API__ADMIN__REGISTER = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
          });

          // api admin forms
          this.FORM__API__ADMIN__CREATE__COMPANY = this.formBuilder.group({
            name: ['',],
            description: ['',],
            address: ['',],
            phoneNumber: ['',]
          });

          this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN = this.formBuilder.group({
            userEmail: ['',Validators.email],
            companyId: [,],
            replaceAdminOneOrTwo: ['',]
          });

          // company forms
          this.FORM__COMPANY__ADD__ADMIN = this.formBuilder.group({
            userEmail: ['',Validators.email],
            companyId: ['',],
            replaceAdminOneOrTwo: ['',]
          });

          this.FORM__COMPANY__DELETE__ADMIN = this.formBuilder.group({
            userEmail: ['',Validators.email],
            companyId: ['',],
            replaceAdminOneOrTwo: ['',]
          });

          this.FORM__COMPANY__CREATE__PRODUCT = this.formBuilder.group({
            name: ['',],
            price_Normal: [0.00,],
            price_Sale: [0.00,],
            imageURL: ['',],
            companyId: ['',],
            keyword: ['',]
          });

          this.FORM__COMPANY__UPDATE__PRODUCT = this.formBuilder.group({
            id: ['',],
            name: ['',],
            price_Normal: [0.00,],
            price_Sale: [0.00,],
            imageURL: ['',],
            keyword: ['',],
            companyId: ['',],
            description: [''],
          });

          this.FORM__COMPANY__DELETE__PRODUCT = this.formBuilder.group({
            id: ['',],
            name: ['',],
            normal_price: [0.00,],
            sale_price: [0.00,],
            current_price: [0.00,],
            image: ['',],
            keyword: ['',],
            companyId: ['',],
            description: [''],
          });


  }
  ngOnInit(): void {
    // this.UserFound = this.authsvc.getUserProfile(this.USER__ID);
    this.authsvc.getUserProfile(this.USER__ID).subscribe((data: dto__full__user) => {
      this.UserFound=data;

      return this.UserFound;
    })
                
    this.authsvc.getUserDetails();

    if (this.ROLES?.includes('API_Admin')) {
      const company_list = this.authsvc.getAllCompanies();
      company_list.forEach(company => {
        this.COMPANY__LIST.push(company);
      });

      const product_list = this.authsvc.dev__getAllProductFromCompany();
      product_list.forEach(product => {
        this.COMPANY__LIST.push(product);
      });
    }
    
  }
  
  API__ADMIN__REGISTER() {
    const NEW__API__ADMIN = new Base__User(this.FORM__API__ADMIN__REGISTER.value.email, this.FORM__API__ADMIN__REGISTER.value.password);
console.log(NEW__API__ADMIN);
    this.authsvc.REGISTER__API__ADMIN(NEW__API__ADMIN).subscribe({
      next: (res) => {

        this.FORM__API__ADMIN__REGISTER.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  API__ADMIN__CREATE__COMPANY() {
    const NEW__COMPANY = new Base__Company("", this.FORM__API__ADMIN__CREATE__COMPANY.value.name, this.FORM__API__ADMIN__CREATE__COMPANY.value.description, this.FORM__API__ADMIN__CREATE__COMPANY.value.address, this.FORM__API__ADMIN__CREATE__COMPANY.value.phoneNumber);

    this.authsvc.CREATE__COMPANY(NEW__COMPANY).subscribe({
      next: (res) => {

        this.FORM__API__ADMIN__CREATE__COMPANY.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  } 

  API__ADMIN__OVERRIDE__COMPANY__ADMIN() {
    const overrideAdmin_DTO = new overrideDTO(this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.value.userEmail, parseInt(this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.value.companyId), this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.value.replaceAdminOneOrTwo);

    this.authsvc.overrideAdmin(overrideAdmin_DTO).subscribe({
      next: (res) => {

        this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  COMPANY__CREATE__PRODUCT() {
    const baseProduct_DTO = new Base__Product('0', this.FORM__COMPANY__CREATE__PRODUCT.value.name, this.FORM__COMPANY__CREATE__PRODUCT.value.normal_price, this.FORM__COMPANY__CREATE__PRODUCT.value.sale_price, this.FORM__COMPANY__CREATE__PRODUCT.value.imageURL, this.FORM__COMPANY__CREATE__PRODUCT.value.companyId, this.FORM__COMPANY__CREATE__PRODUCT.value.keyword);

    this.authsvc.createProduct(baseProduct_DTO).subscribe({
      next: (res) => {

        this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.reset();
        this.router.navigateByUrl('/dev');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  COMPANY__DELETE__PRODUCT() {
    const productId = this.FORM__COMPANY__DELETE__PRODUCT.value.companyId;

    this.authsvc.deleteProduct(productId);

        this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.reset();
        this.router.navigateByUrl('/dev');
  } 

  COMPANY__UPDATE__PRODUCT() {
    const baseProduct_DTO = new Base__Product('0', this.FORM__COMPANY__CREATE__PRODUCT.value.name, this.FORM__COMPANY__CREATE__PRODUCT.value.normal_price, this.FORM__COMPANY__CREATE__PRODUCT.value.sale_price, this.FORM__COMPANY__CREATE__PRODUCT.value.imageURL, this.FORM__COMPANY__CREATE__PRODUCT.value.companyId, this.FORM__COMPANY__CREATE__PRODUCT.value.keyword);

    this.authsvc.updateProduct(baseProduct_DTO).subscribe({
      next: (res) => {

        this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN.reset();
        this.router.navigateByUrl('/dev');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logout() { this.authsvc.LOGOUT__USER(); this.router.navigateByUrl('/');}
}
