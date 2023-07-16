import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { v2_newProductDTO } from 'src/app/shared/DTOs/Products/v2_newProductDTO';
import { overrideDTO } from 'src/app/shared/DTOs/overrideDTo';
import { v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';
import { v2_CompanyService } from 'src/app/shared/company/v2_company.service';
import { updatePasswordDTO } from 'src/app/shared/v2_DTOs/updatePasswordDTO';
import { v2_CompanyDTO } from 'src/app/shared/v2_DTOs/v2_Company';
import { v2_CustomerDTO } from 'src/app/shared/v2_DTOs/v2_Customer';
import { v2_OrderDTO } from 'src/app/shared/v2_DTOs/v2_Order';
import { v2_ProductDTO } from 'src/app/shared/v2_DTOs/v2_ProductStripe';
import { v2_ShoppingCartDTO } from 'src/app/shared/v2_DTOs/v2_ShoppingCart';
import { v2_StaffDTO } from 'src/app/shared/v2_DTOs/v2_Staff';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent implements OnInit {

  // company images
  _imageDomain: string = 'http://localhost:5035/api/v2/company/images/';
  _header: string = '/header';
  _aboutus: string = '/aboutus';
  _location: string = '/location';
  _logo: string = '/logo';
  _misc: string = '.misc';

  // product images
  _newProductAction = "http://localhost:5035/api/v2/products/create/";
  _updateImageAction = "http://localhost:5035/api/v2/products/update/image/";
  _deleteProductAction = "http://localhost:5035/api/v2/products/delete/";


  _productImageDomain: string = 'http://localhost:5035/api/v2/product/update/image/';

  _orderDomain: string = 'http://localhost:5035/api/v2/company/orders/';
  _ready: string = '/ready/';

  defaultPassword: string = "P@ssword1";
  StringsAreAMatch: number = 0;
  
  FORM_updateCompany: FormGroup;
  FORM_overrideAdmin: FormGroup;
  FORM_newStaff: FormGroup;
  FORM_updatePassword: FormGroup;
  FORM_updateProfile: FormGroup;
  FORM_newProduct: FormGroup;
  FORM_updateProduct: FormGroup;
  FORM_deleteProduct: FormGroup;
  FORM_updateImage: FormGroup;

  companyStaffList: Array<v2_StaffDTO> = [];
  adminList: Array<v2_StaffDTO> = [];
  nonAdminList: Array<v2_StaffDTO> = [];

  v2_CustomerId= this.v2_authService.returnUserId()!;

  v2_ActiveOrders: Array<v2_OrderDTO> = [];
  v2_CompletedOrders: Array<v2_OrderDTO> = [];

  v2_Products: Array<v2_ProductDTO> = [];

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
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    phoneNumber: '',
    addressSuite: '',
    addressCountry: ''
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
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    phoneNumber: '',
    addressSuite: '',
    addressCountry: ''
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
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    phoneNumber: '',
    addressSuite: '',
    addressCountry: ''
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
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    phoneNumber: '',
    addressSuite: '',
    addressCountry: ''
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
    administratorTwo: this.v2_AdministratorTwo,
  };

  constructor(private formBuilder: FormBuilder, private v2_authService: v2_AuthService, private v2_companyService: v2_CompanyService, private router: Router)
  {
    this.FORM_newStaff = this.formBuilder.group({
      Email: ['', Validators.email]
    });

    this.FORM_updateCompany = this.formBuilder.group({
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
      userEmail: [String,Validators.email],
      companyId: this.v2_Company.id,
      replaceAdminOneOrTwo: [,]
    });

    this.FORM_newProduct = this.formBuilder.group({
      name: ['',],
      description: ['',],
      default_price: [,]
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

    this.FORM_updateImage = this.formBuilder.group({
      updateImage: ['',],
      productId: [,]
    })
  }
  ngOnInit(): void {
    const presentationId: number = 1;

    // get company details
    this.v2_companyService.v2_getCompanyDetails(presentationId).subscribe(async (data: v2_CompanyDTO) => {
      this.v2_Company = data;
      return await this.v2_Company;
    });

    // get company products
    this.v2_companyService.v2_getAllCompanyProducts(presentationId).subscribe(async (data: Array<v2_ProductDTO>) => {
      this.v2_Products = data;
      return await this.v2_Products;
    });
    
    // get full list
    this.v2_companyService.v2_getStaffList(presentationId).subscribe(async (data: Array<v2_StaffDTO>) => {
      this.companyStaffList = data;
    });

    // get admin list
    this.v2_companyService.v2_getAdminList(presentationId).subscribe(async (data: Array<v2_StaffDTO>) => {
      this.adminList = data;
    });

    // get non admin list
    this.v2_companyService.v2_getNonAdminList(presentationId).subscribe(async (data: Array<v2_StaffDTO>) => {
      this.nonAdminList = data;
    });

    this.v2_authService.v2_getCustomerProfile(this.v2_CustomerId).subscribe((data: v2_StaffDTO) => {
      this.v2_Staff = data;
      console.log(data);
      return this.v2_Staff;
    });
  }

  updateProfile() {
    let staff = new v2_StaffDTO(this.v2_CustomerId, this.FORM_updateProfile.value.name, this.v2_Staff.position, this.v2_Staff.giveAdminPrivledges, this.v2_Staff.longitude, this.v2_Staff.latitude, this.v2_Staff.coordinates, "", this.v2_Staff.email, this.FORM_updateProfile.value.addressStreet, this.FORM_updateProfile.value.addressSuite, this.FORM_updateProfile.value.addressCity, this.FORM_updateProfile.value.addressState, this.FORM_updateProfile.value.addressPostal_Code, this.FORM_updateProfile.value.addressCountry, this.FORM_updateProfile.value.phoneNumber);

    this.v2_authService.v2_updateStaffProfile(this.v2_CustomerId, staff).subscribe({
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

  v2_newProduct() {
    let default_quantity: number = 1;
    let newProduct = new v2_newProductDTO
    (
      this.v2_Company.id,
      this.FORM_newProduct.value.name,
      this.FORM_newProduct.value.description,
      this.FORM_newProduct.value.default_price,
      default_quantity,
    );

    this.v2_companyService.v2_newProduct(newProduct).subscribe({
      next: (res) => {
        
        this.FORM_newProduct.reset();
        this.router.navigateByUrl('/staff');
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
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_updateProductImage() {
    let formdata = new FormData();
    formdata.append('file', this.FORM_updateImage.get('updateImage')?.value);
    let pid = this.FORM_updateImage.value.productId;
    console.log(formdata);
    console.log(pid);

    this.v2_companyService.v2_updateProductImage(formdata, pid).subscribe({
      next: (res) => {

        this.FORM_updateImage.reset();
        console.log(res);
        this.router.navigateByUrl("/staff");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateCompany() {
    let updateCompany = new v2_CompanyDTO(this.v2_Company.id, this.FORM_updateCompany.value.name, this.FORM_updateCompany.value.description, this.FORM_updateCompany.value.phoneNumber, this.v2_Company.smallTagline, this.v2_Company.menuDescription, this.FORM_updateCompany.value.addressStreet, this.FORM_updateCompany.value.addressSuite, this.FORM_updateCompany.value.addressCity, this.FORM_updateCompany.value.addressState, this.FORM_updateCompany.value.addressPostal_Code, this.FORM_updateCompany.value.addressCountry, this.v2_Company.headerImage, this.v2_Company.aboutUsImageUrl, this.v2_Company.locationImageUrl, this.v2_Company.logoImageUrl, this.v2_Company.miscImageUrl, [], this.v2_Owner, this.v2_AdministratorOne, this.v2_AdministratorTwo);

    
    this.v2_companyService.v2_updateCompanyDetails(updateCompany).subscribe({
      next: (res) => {

        this.FORM_updateCompany.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  v2_OverrideAdmin() {
    const overrideAdmin_DTO = new overrideDTO(this.FORM_overrideAdmin.value.userEmail, this.v2_Company.id, this.FORM_overrideAdmin.value.replaceAdminOneOrTwo);

    this.v2_authService.v2_overrideAdmin(overrideAdmin_DTO).subscribe({
      next: (res) => {

        this.FORM_overrideAdmin.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  staffCreate() {
    let newStaff = new Base__User(this.FORM_newStaff.value.Email, this.defaultPassword);

    this.v2_authService.v2_registerStaff(newStaff).subscribe({
      next: (res) => {

        this.router.navigateByUrl('/dev');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}