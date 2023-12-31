import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, delay, map } from 'rxjs';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
import { Base__Cart } from 'src/app/shared/DTOs/Carts/Base__Cart';
import { Full__Cart } from 'src/app/shared/DTOs/Carts/Full__Cart';
import { Base__Company } from 'src/app/shared/DTOs/Companies/Base__Company';
import { Full__Company } from 'src/app/shared/DTOs/Companies/Full__Company';
import { Base__Product } from 'src/app/shared/DTOs/Products/Base__Product';
import { Full__Product } from 'src/app/shared/DTOs/Products/Full__Product';
import { newProductDTO } from 'src/app/shared/DTOs/Products/newProductDTO';
import { overrideDTO } from 'src/app/shared/DTOs/overrideDTo';
import { AuthService } from 'src/app/shared/authsvc/auth.service';

// user profile
export interface userdetails {
  Id: '',
  Name: '',
  PhoneNumber: '',
  CompanyId: '',
  IsStaff: Boolean,
  CartList: [],
  OrderList: [],
  Email: '',
  Password: '',
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private user: BehaviorSubject<Full__User | null | undefined> = new BehaviorSubject<Full__User | null | undefined>(undefined);

  // API ADMIN Forms
  FORM__API__ADMIN__REGISTER: FormGroup;
  FORM__API__ADMIN__CREATE__COMPANY: FormGroup;
  FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN: FormGroup;
  
  FORM__COMPANY__ADD__ADMIN: FormGroup;
  FORM__COMPANY__DELETE__ADMIN: FormGroup;

  // Company Forms
  FORM__COMPANY__CREATE__PRODUCT: FormGroup;
  FORM__COMPANY__UPDATE__PRODUCT: FormGroup;
  FORM__COMPANY__DELETE__PRODUCT: FormGroup;

  FORM__USER__UPDATE__PROFILE: FormGroup;
  FORM__USER__UPDATE__PASSWORD: FormGroup;

  FORM__ADD__TO__CART: FormGroup;

  newProductAction = this.authsvc.returnNewProductURL();

  // Get's User Id
  USER__ID = this.authsvc.returnUserId()!;

  // Get's Roles
  ROLES = this.authsvc.returnRoles();

  COMPANY__LIST: Array<any> = [];
  PRODUCTS__LIST: Array<Full__Product> = [];
  
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

  CURRENT__CART: Full__Cart = {
    id: '',
    customerId: '',
    companyId: '',
    productsList: [],
    total_Amount: 0,
    abandoned: false,
    submitted: false,
  };

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
  }

  constructor(public formBuilder: FormBuilder, private authsvc: AuthService, private actRoute: ActivatedRoute, private router: Router){
    this.FORM__API__ADMIN__REGISTER = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
    });

    this.FORM__API__ADMIN__CREATE__COMPANY = this.formBuilder.group({
    name: ['',],
    description: ['',],
    address: ['',],
    phoneNumber: ['',]
    });

    this.FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN = this.formBuilder.group({
    userEmail: ['',Validators.email],
    companyId: ['',],
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
    Id: ['',],
    Name: ['',],
    Price_Normal: ['',],
    Price_Sale: ['',],
    ImageURL: ['', ],
    CompanyId: ['',],
    Keyword: ['',]
    });

    this.FORM__COMPANY__UPDATE__PRODUCT = this.formBuilder.group({
    productId: ['',],
    name: ['',],
    price_Normal: [0.00,],
    price_Sale: [0.00,],
    imageURL: ['',],
    keyword: ['',],
    companyId: ['',],
    description: [''],
    });

    this.FORM__COMPANY__DELETE__PRODUCT = this.formBuilder.group({
    productId: [,]
    });

    this.FORM__USER__UPDATE__PROFILE = this.formBuilder.group({
    name: ['',],
    phoneNumber: ['',],
    });

    this.FORM__USER__UPDATE__PASSWORD = this.formBuilder.group({
    currentPassword: ['',Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")],
    newPassword: ['',Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")],
    });

    this.FORM__ADD__TO__CART = this.formBuilder.group({
    userId: ['',],
    productId: ['',],
    companyId: ['',],
    email: ['',],
    });
  }
  async ngOnInit(): Promise<void> {
    // this.UserFound = this.authsvc.getUserProfile(this.USER__ID);
    this.authsvc.getUserProfile(this.USER__ID).subscribe((data: dto__full__user) => {
      this.UserFound=data;

      return this.UserFound;
    })
                
    this.UserFound = this.authsvc.getUserDetails();

    if (this.ROLES?.includes('API_Admin') || this.ROLES?.includes('Company_Admin')) {

      this.authsvc.getCompanyDetails(1).subscribe(async (data: Full__Company) => {
        this.COMPANY__FOUND=data;
        console.log(data);

        await this.COMPANY__FOUND;

        let k: number = parseInt(this.COMPANY__FOUND.id);
        this.authsvc.getAllProductFromCompany(k).subscribe((data2: Array<Full__Product>) => {
          this.PRODUCTS__LIST=data2;

          return this.PRODUCTS__LIST;
        });
      });

      console.log(this.COMPANY__FOUND);

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
    // var file = event.target.files[0];
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);
    
    // formData.append('ImageURL', this.FORM__COMPANY__CREATE__PRODUCT.get('ImageURL')?.value);
    const _newProductDTO = new newProductDTO('0', this.FORM__COMPANY__CREATE__PRODUCT.value.Name, this.FORM__COMPANY__CREATE__PRODUCT.value.Price_Normal, this.FORM__COMPANY__CREATE__PRODUCT.value.Price_Sale, '', this.FORM__COMPANY__CREATE__PRODUCT.value.CompanyId, this.FORM__COMPANY__CREATE__PRODUCT.value.Keyword);
console.log(this.FORM__COMPANY__CREATE__PRODUCT.value.Price_Normal);
    this.authsvc.createProduct(_newProductDTO).subscribe({
      next: async (res) => {

        this.FORM__COMPANY__CREATE__PRODUCT.reset();
        
        await delay(1000);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 
  COMPANY__DELETE__PRODUCT() {
    const productId = this.FORM__COMPANY__DELETE__PRODUCT.value.productId;
    console.log(productId);

    this.authsvc.deleteProduct(productId).subscribe({
      next: (res) => {

        this.FORM__COMPANY__DELETE__PRODUCT.reset();
        this.authsvc.getAllProductFromCompany(parseInt(this.COMPANY__FOUND.id)).subscribe((data2: Array<Full__Product>) => {
          this.PRODUCTS__LIST=data2;
          return this.PRODUCTS__LIST;
        });
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log(err);
      }
    });
  } 

  COMPANY__UPDATE__PRODUCT() {
    const baseProduct_DTO = new Base__Product('0', this.FORM__COMPANY__UPDATE__PRODUCT.value.name, this.FORM__COMPANY__UPDATE__PRODUCT.value.normal_price, this.FORM__COMPANY__UPDATE__PRODUCT.value.sale_price, this.FORM__COMPANY__UPDATE__PRODUCT.value.imageURL, this.FORM__COMPANY__UPDATE__PRODUCT.value.companyId, this.FORM__COMPANY__UPDATE__PRODUCT.value.keyword);

    this.authsvc.updateProduct(baseProduct_DTO).subscribe({
      next: (res) => {

        this.FORM__COMPANY__UPDATE__PRODUCT.reset();
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  USER__UPDATE__PROFILE() {

  }

  USER__UPDATE__PASSWORD() {
    
  }

  // USER__ADD__TO__CART() {
  //   let addToCartURL = `${this.FORM__ADD__TO__CART.value.companyId}/${this.FORM__ADD__TO__CART.value.productId}`;
  //   let companyId = this.FORM__ADD__TO__CART.value.companyId;
  //   let userAdding = this.FORM__ADD__TO__CART.value.email;

  //   let companyIdNumber = parseInt(companyId);
  //   let userId = parseInt(this.FORM__ADD__TO__CART.value.userId);


  //   this.authsvc.addToCart(addToCartURL, userAdding).subscribe({
  //     next: (res) => {

  //       this.FORM__ADD__TO__CART.reset();
  //       this.authsvc.returnCurrentCart(companyIdNumber, userAdding).subscribe((data3: Base__Cart) => {
  //         this.CURRENT__CART=data3;
  //         return this.CURRENT__CART;
  //       });
  //       this.router.navigateByUrl('/dashboard');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });

  // }

  logout() { this.authsvc.LOGOUT__USER(); this.router.navigateByUrl('/');}
}
