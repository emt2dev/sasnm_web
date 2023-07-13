import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from 'environment';
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
import { v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';
import { CompanyService } from 'src/app/shared/company/company.service';
import { v2_CompanyService } from 'src/app/shared/company/v2_company.service';
import { v2_CompanyDTO } from 'src/app/shared/v2_DTOs/v2_Company';
import { v2_CustomerDTO } from 'src/app/shared/v2_DTOs/v2_Customer';
import { v2_OrderDTO } from 'src/app/shared/v2_DTOs/v2_Order';
import { v2_ProductDTO } from 'src/app/shared/v2_DTOs/v2_ProductStripe';
import { v2_ShoppingCartDTO } from 'src/app/shared/v2_DTOs/v2_ShoppingCart';
import { v2_StaffDTO } from 'src/app/shared/v2_DTOs/v2_Staff';

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

  // allows stripe methods
  private stripePromise?: Promise<Stripe | null>;

  // API Admin Forms and Info
  FORM_newDev: FormGroup;
  FORM_newCompany: FormGroup;
  FORM_overrideAdmin: FormGroup;

  // Company Forms and Info
  FORM__COMPANY__ADD__ADMIN: FormGroup;
  FORM__COMPANY__DELETE__ADMIN: FormGroup;

  FORM_newProduct: FormGroup;
  FORM_updateProduct: FormGroup;
  FORM_deleteProduct: FormGroup;

  // User Forms and Info
  FORM__USER__UPDATE__PROFILE: FormGroup;
  FORM__USER__UPDATE__PASSWORD: FormGroup;
  
  v2_CustomerId= this.v2_authService.returnUserId()!;
  v2_Roles = this.v2_authService.returnRoles();
  v2_newProductAction = this.v2_companyService.v2_returnNewProductURL();

  v2_Staff: v2_StaffDTO = {
    id: '...Loading...',
    name: '...Loading...',
    position: '...Loading...',
    giveAdminPrivledges: false,
    longitude: '...Loading...',
    latitude: '...Loading...',
    coordinates: '...Loading...',
    password: '...Loading...',
    email: '...Loading...'
  };

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

  DefaultComparison: string = '...Loading...';
  StringsAreAMatch: number = 0;
  OwnerComparison: string = this.v2_Company.owner.email;
  AdministratorOneComparison: string = this.v2_Company.administratorOne.email;
  AdministratorTwoComparison: string = this.v2_Company.administratorTwo.email;

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
  
  v2_Cart: v2_ShoppingCartDTO = {
    id: 0,
    companyId: 0,
    customerId: '...Loading...',
    Items: [],
    cost: 0,
    submitted: false,
    abandoned: false,
    costInString: '...Loading...',
  };

  v2_Products: Array<v2_ProductDTO> = [];
  v2_ActiveOrders: Array<v2_OrderDTO> = [];
  
  // Cart Forms and Info
  FORM__ADD__TO__CART: FormGroup;

  constructor(public formBuilder: FormBuilder, private v2_authService: v2_AuthService, private v2_companyService: v2_CompanyService, private actRoute: ActivatedRoute, private router: Router){
    this.FORM_newDev = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
    });

    this.FORM_newCompany = this.formBuilder.group({
      name: ['',],
      description: ['',],
      phoneNumber: ['',],
      smallTagline: ['',],
      menuDescription: ['',],
      addressStreet: ['',],
      addressSuite: ['',],
      addressCity: ['',],
      addressState: ['',],
      addressPostal_Code: ['',],
      addressCountry: ['',],
    });

    this.FORM_overrideAdmin = this.formBuilder.group({
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

    this.FORM_newProduct = this.formBuilder.group({
      id: [,],
      companyId: [,],
      stripeId: ['',],
      name: ['',],
      description: ['',],
      default_price: [,],
      package_dimensions: ['',],
      statement_descriptor: ['',],
      unit_label: ['',],
      shippable: ['',],
      image: ['',],
      url: ['',],
      priceInString: ['',],
      seo: ['',],
      keyword: ['',],
      imageToBeUploaded: [File,],
    });

    this.FORM_updateProduct = this.formBuilder.group({
      id: [,],
      companyId: [,],
      stripeId: ['',],
      name: ['',],
      description: ['',],
      default_price: [,],
      quantity: [,],
      package_dimensions: ['',],
      statement_descriptor: ['',],
      unit_label: ['',],
      shippable: ['',],
      image: ['',],
      url: ['',],
      priceInString: ['',],
      seo: ['',],
      keyword: ['',],
      imageToBeUploaded: ['',],
    });

    this.FORM_deleteProduct = this.formBuilder.group({
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
    let presentationId = 1;
    
    this.v2_authService.v2_getCustomerProfile(this.v2_CustomerId).subscribe((data: v2_CustomerDTO) => {
      this.v2_Customer = data;
      console.log(data);
      return this.v2_Customer;
    });
                
    this.v2_Customer = this.v2_authService.v2_displayCustomerDetails();

    // if staff
/*
    this.v2_companyService.v2_getCompanyDetails(presentationId).subscribe(async (data: v2_CompanyDTO) => {
      this.v2_Company = data;

      await this.v2_Company;
    });

    this.v2_companyService.v2_getAllCompanyProducts(presentationId).subscribe(async (data: Array<v2_ProductDTO>) => {
      this.v2_Products = data;

      await this.v2_Products;
    });

    this.v2_Staff = this.v2_authService.v2_displayStaffDetails();
*/  

    this.v2_companyService.v2_getCustomerCart(presentationId, this.v2_Customer.id).subscribe(async (data: v2_ShoppingCartDTO) => {
    this.v2_Cart = data;

    await this.v2_Cart;
    });

    this.v2_companyService.v2_getActiveCustomerOrders(presentationId, this.v2_CustomerId).subscribe(async (data: Array<v2_OrderDTO>) => {
      this.v2_ActiveOrders = data;

      await this.v2_ActiveOrders;
    });

    this.v2_companyService.v2_getAllCompanyProducts(presentationId).subscribe(async (data: Array<v2_ProductDTO>) => {
      this.v2_Products = data;

      await this.v2_Products;
    });
  }

  v2_newDev() {
    let newDev = new Base__User(this.FORM_newDev.value.email, this.FORM_newDev.value.password);

    this.v2_authService.v2_registerDev_Entry(newDev).subscribe({
      next: (res) => {

        this.FORM_newDev.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_newCompany() {
    let newCompany = new v2_CompanyDTO(0, this.FORM_newCompany.value.name, "This is an example description of your company, and we're proud to do it in our small town. We've pulled ourselevs up by our bootstraps and offer the best bang for your buck.", this.FORM_newCompany.value.phoneNumber, "Our Products are the result of our love for family and good quality which we dedicate to our customers.", "Comfort Food With A Puerto-Rican Twist.", this.FORM_newCompany.value.addressStreet, this.FORM_newCompany.value.addressSuite, this.FORM_newCompany.value.addressCity, this.FORM_newCompany.value.addressState, this.FORM_newCompany.value.addressPostal_Code, this.FORM_newCompany.value.addressCountry, "https://via.placeholder.com/200x100?text=Header%20Placeholder", "https://via.placeholder.com/150x100?text=About%20Us", "https://via.placeholder.com/150x100?text=Location", "https://via.placeholder.com/300x150?text=Logo", "https://via.placeholder.com/150x80?text=Misc%20Image", [], this.v2_Owner, this.v2_AdministratorOne, this.v2_AdministratorTwo);

    this.v2_authService.v2_NewCompany(newCompany).subscribe({
      next: (res) => {

        this.FORM_newCompany.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_newProduct() {
    let newProduct = new v2_ProductDTO
    (
      0,
      this.v2_Company.id,
      "",
      this.FORM_newProduct.value.name,
      this.FORM_newProduct.value.description,
      this.FORM_newProduct.value.default_price,
      1,
      false,
      this.FORM_newProduct.value.package_dimensions,
      this.FORM_newProduct.value.statement_descriptor,
      this.FORM_newProduct.value.unit_label,
      false,
      "https://via.placeholder.com/150x80?text=image",
      "",
      this.FORM_newProduct.value.default_price.toString(),
      this.FORM_newProduct.value.seo,
      this.FORM_newProduct.value.keyword,
      "",
    );

    this.v2_companyService.v2_newProduct(newProduct).subscribe({
      next: (res) => {

        this.FORM_newProduct.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_OverrideAdmin() {
    const overrideAdmin_DTO = new overrideDTO(this.FORM_overrideAdmin.value.userEmail, parseInt(this.FORM_overrideAdmin.value.companyId), this.FORM_overrideAdmin.value.replaceAdminOneOrTwo);

    this.v2_authService.v2_overrideAdmin(overrideAdmin_DTO).subscribe({
      next: (res) => {

        this.FORM_overrideAdmin.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_deleteProduct() {
    const productId = this.FORM_deleteProduct.value.productId;
    console.log(productId);

    this.v2_companyService.v2_deleteProduct(productId).subscribe({
      next: (res) => {

        this.FORM_deleteProduct.reset();
        this.v2_companyService.v2_getAllCompanyProducts(parseInt(this.v2_Customer.id)).subscribe((data2: Array<v2_ProductDTO>) => {
          this.v2_Products = data2;
          return this.v2_Products;
        });
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_updateProductImage() {
    // console.log(event);
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
        this.v2_companyService.v2_getCustomerCart(presentationId, this.v2_Customer.id).subscribe(async (data: v2_ShoppingCartDTO) => {
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
    this.v2_companyService.v2_newDeliveryOrder(companyId, this.v2_Customer.id).subscribe((response: string) => {            
      stripe?.redirectToCheckout({ sessionId: response });
    });
  }
  
  async v2_CheckoutTakeout(event: any) {
    let publicApiKey = environment.stripe;
  
    let companyId: number = this.v2_Company.id;
  
    this.stripePromise = loadStripe(publicApiKey);
    const stripe = await this.stripePromise;
    this.v2_companyService.v2_newTakeoutOrder(companyId, this.v2_Customer.id).subscribe((response: string) => {            
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
    
    let customerId = this.v2_Customer.id;

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
    
    let customerId = this.v2_Customer.id;

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
