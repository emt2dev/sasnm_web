import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, delay } from 'rxjs';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
// import { Cart } from 'src/app/shared/DTOs/Carts/Cart';
import { Full__Cart } from 'src/app/shared/DTOs/Carts/Full__Cart';
import { shoppingCart } from 'src/app/shared/DTOs/Carts/shoppingCart';
import { Base__Company } from 'src/app/shared/DTOs/Companies/Base__Company';
import { Full__Company } from 'src/app/shared/DTOs/Companies/Full__Company';
import { Base__Product } from 'src/app/shared/DTOs/Products/Base__Product';
import { Full__Product } from 'src/app/shared/DTOs/Products/Full__Product';
import { newProductDTO } from 'src/app/shared/DTOs/Products/newProductDTO';
import { overrideDTO } from 'src/app/shared/DTOs/overrideDTo';
import { AuthService } from 'src/app/shared/authsvc/auth.service';
import { CompanyService } from 'src/app/shared/company/company.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  private user: BehaviorSubject<Full__User | null | undefined> = new BehaviorSubject<Full__User | null | undefined>(undefined);

  // API Admin Forms and Info
  FORM__API__ADMIN__REGISTER: FormGroup;
  FORM__API__ADMIN__CREATE__COMPANY: FormGroup;
  FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN: FormGroup;

  // Company Forms and Info
  FORM__COMPANY__ADD__ADMIN: FormGroup;
  FORM__COMPANY__DELETE__ADMIN: FormGroup;

  FORM__COMPANY__CREATE__PRODUCT: FormGroup;
  FORM__COMPANY__UPDATE__PRODUCT: FormGroup;
  FORM__COMPANY__DELETE__PRODUCT: FormGroup;

  newProductAction = this.authService.returnNewProductURL();

  COMPANY__LIST: Array<any> = [];
  PRODUCTS__LIST: Array<Full__Product> = [];

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

  // User Forms and Info
  FORM__USER__UPDATE__PROFILE: FormGroup;
  FORM__USER__UPDATE__PASSWORD: FormGroup;
  USER__ID = this.authService.returnUserId()!;
  ROLES = this.authService.returnRoles();

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

  // Cart Forms and Info
  FORM__ADD__TO__CART: FormGroup;

  CURRENT__CART: shoppingCart = {
    id: 0,
    customerId: '',
    companyId: '',
    items: [],
    cost: 0,
    abandoned: false,
    submitted: false,
  };

  constructor(public formBuilder: FormBuilder, private authService: AuthService, private companyService: CompanyService, private actRoute: ActivatedRoute, private router: Router){
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
    // this.UserFound = this.authService.getUserProfile(this.USER__ID);
    this.authService.getUserProfile(this.USER__ID).subscribe((data: Full__User) => {
      this.UserFound=data;

      return this.UserFound;
    })
                
    this.UserFound = this.authService.getUserDetails();

    // if (this.ROLES?.includes('API_Admin') || this.ROLES?.includes('Company_Admin')) {

      this.authService.getCompanyDetails(1).subscribe(async (data: Full__Company) => {
        this.COMPANY__FOUND=data;
        console.log(data);

        await this.COMPANY__FOUND;

        let k: number = parseInt(this.COMPANY__FOUND.id);
        
        this.authService.getAllProductFromCompany(k).subscribe((data2: Array<Full__Product>) => {
          this.PRODUCTS__LIST=data2;

          return this.PRODUCTS__LIST;
        });
      });

      this.companyService.getUserCart(1, this.USER__ID).subscribe(async (data: shoppingCart) => {
        this.CURRENT__CART=data;
  
        await this.CURRENT__CART;
  
        this.CURRENT__CART.cost = parseFloat(this.CURRENT__CART.cost.toFixed(4));
  
      });
    // }
  }


  API__ADMIN__REGISTER() {
    const NEW__API__ADMIN = new Base__User(this.FORM__API__ADMIN__REGISTER.value.email, this.FORM__API__ADMIN__REGISTER.value.password);
  console.log(NEW__API__ADMIN);
    this.authService.REGISTER__API__ADMIN(NEW__API__ADMIN).subscribe({
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

    this.authService.CREATE__COMPANY(NEW__COMPANY).subscribe({
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

    this.authService.overrideAdmin(overrideAdmin_DTO).subscribe({
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
    this.authService.createProduct(_newProductDTO).subscribe({
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

    this.authService.deleteProduct(productId).subscribe({
      next: (res) => {

        this.FORM__COMPANY__DELETE__PRODUCT.reset();
        this.authService.getAllProductFromCompany(parseInt(this.COMPANY__FOUND.id)).subscribe((data2: Array<Full__Product>) => {
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

    this.authService.updateProduct(baseProduct_DTO).subscribe({
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


  //   this.authService.addToCart(addToCartURL, userAdding).subscribe({
  //     next: (res) => {

  //       this.FORM__ADD__TO__CART.reset();
  //       this.authService.returnCurrentCart(companyIdNumber, userAdding).subscribe((data3: Base__Cart) => {
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
      console.log(res);
      
    }
  });

  // generic stripe payment link with static elements is below
  //
}
// CHECKOUT(event: any) {
//   let i: number = parseInt(this.COMPANY__FOUND.id);
//   // here we attempt to reach our api for checking out
//   this.companyService.submitOrder(i, this.UserFound.id).subscribe({
//     next: (res) => {
//       console.log(res);
//     }
//   });

//   // generic stripe payment link with static elements is below
//   // window.location.href = "https://buy.stripe.com/bIY7sJ62O7wz1dmfZ1";
// }


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

  logout() { this.authService.LOGOUT__USER(); this.router.navigateByUrl('/'); }
}
