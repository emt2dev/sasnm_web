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
import { STAFF, v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';
import { CompanyService } from 'src/app/shared/company/company.service';
import { v2_CompanyService } from 'src/app/shared/company/v2_company.service';
import { updatePasswordDTO } from 'src/app/shared/v2_DTOs/updatePasswordDTO';
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
  private user: BehaviorSubject<v2_CustomerDTO | null | undefined> = new BehaviorSubject<v2_CustomerDTO | null | undefined>(undefined);

  // allows stripe methods
  private stripePromise?: Promise<Stripe | null>;

  FORM_updatePassword: FormGroup;
  FORM_updateProfile: FormGroup;
  
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
    email: '...Loading...',
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
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
    phoneNumber: '..Loading...',
    addressSuite: '',
    addressCountry: ''
  }
  
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

  v2_Products: Array<v2_ProductDTO> = [];
  
  v2_ActiveOrders: Array<v2_OrderDTO> = [];
  v2_CompletedOrders: Array<v2_OrderDTO> = [];
  
  // Cart Forms and Info
  FORM__ADD__TO__CART: FormGroup;

  constructor(public formBuilder: FormBuilder, private v2_authService: v2_AuthService, private v2_companyService: v2_CompanyService, private actRoute: ActivatedRoute, private router: Router){
    

    this.FORM__ADD__TO__CART = this.formBuilder.group({
      userId: ['',],
      productId: ['',],
      companyId: ['',],
      email: ['',],
    });

    this.FORM_updateProfile = this.formBuilder.group({
      name: [this.v2_Staff.email,],
      phoneNumber: [this.v2_Staff.phoneNumber,],
      addressStreet: [this.v2_Staff.addressStreet,],
      addressSuite: [this.v2_Staff.addressSuite,],
      addressCity: [this.v2_Staff.addressCity,],
      addressState: [this.v2_Staff.addressState,],
      addressPostal_Code: [this.v2_Staff.addressPostal_Code,],
      addressCountry: ["USA",],
    });

    this.FORM_updatePassword = this.formBuilder.group({
      currentPassword: ['',],
      newPassword: ['',],
    });
  }

  async ngOnInit(): Promise<void> {
    let presentationId = 1;

    this.v2_companyService.v2_getCompanyDetails(presentationId).subscribe(async (data: v2_CompanyDTO) => {
      this.v2_Company = data;

      await this.v2_Company;
    });

    this.v2_companyService.v2_getAllCompanyProducts(presentationId).subscribe(async (data: Array<v2_ProductDTO>) => {
      this.v2_Products = data;

      await this.v2_Products;
    });

    this.v2_Staff = this.v2_authService.v2_displayStaffDetails();
    
    this.v2_authService.v2_getCustomerProfile(this.v2_CustomerId).subscribe((data: v2_CustomerDTO) => {
      this.v2_Customer = data;
      console.log(data);
      return this.v2_Customer;
    });
                
    this.v2_Customer = this.v2_authService.v2_displayCustomerDetails();

    this.v2_companyService.v2_getCustomerCart(presentationId, this.v2_CustomerId).subscribe(async (data: v2_ShoppingCartDTO) => {
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

  updateProfile() {
    let customer = new v2_CustomerDTO(this.v2_CustomerId, this.FORM_updateProfile.value.name, this.v2_Customer.description, this.FORM_updateProfile.value.addressStreet, this.FORM_updateProfile.value.addressSuite, this.FORM_updateProfile.value.addressCity, this.FORM_updateProfile.value.addressState, this.FORM_updateProfile.value.addressPostal_Code, this.FORM_updateProfile.value.addressCountry, this.v2_Customer.currency, false, '', this.v2_Customer.email, this.FORM_updateProfile.value.phoneNumber);

    this.v2_authService.v2_updateCustomerProfile(this.v2_CustomerId, customer).subscribe({
      next: (res) => {

        this.FORM_updateProfile.reset();
        this.router.navigateByUrl("dashboard");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updatePassword() {
    let updatePasswordAttempt = new updatePasswordDTO(this.FORM_updatePassword.value.currentPassword, this.FORM_updatePassword.value.newPassword);

    let userId = this.v2_CustomerId;
;

    this.v2_authService.v2_updatePassword(userId, updatePasswordAttempt).subscribe({
      next: (res) => {

        this.FORM_updatePassword.reset();
      },
      error: (err) => {
        console.log(err);
      }
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
