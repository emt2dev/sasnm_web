import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { overrideDTO } from 'src/app/shared/DTOs/overrideDTo';
import { DEV, v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';
import { v2_CompanyService } from 'src/app/shared/company/v2_company.service';
import { v2_CompanyDTO } from 'src/app/shared/v2_DTOs/v2_Company';
import { v2_StaffDTO } from 'src/app/shared/v2_DTOs/v2_Staff';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {
  private user: BehaviorSubject<v2_StaffDTO | null | undefined> = new BehaviorSubject<v2_StaffDTO | null | undefined>(undefined);

  defaultPassword: string = "P@ssword1";

  defaultValue: string = "...Loading...";
  defaultPostalCode: string = "33805";
  defaultCountry: string = "USA";

  FORM_newStaff: FormGroup;
  FORM_overrideAdmin: FormGroup;
  FORM_newCompany: FormGroup;
  FORM_newDev: FormGroup;

  companyStaffList: Array<v2_StaffDTO> = [];
  adminList: Array<v2_StaffDTO> = [];
  nonAdminList: Array<v2_StaffDTO> = [];

  v2_Staff: v2_StaffDTO = {
    id: this.defaultValue,
    name: this.defaultValue,
    position: this.defaultValue,
    giveAdminPrivledges: false,
    longitude: this.defaultValue,
    latitude: this.defaultValue,
    coordinates: this.defaultValue,
    password: this.defaultValue,
    email: this.defaultValue,
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  v2_Owner: v2_StaffDTO = {
    id: this.defaultValue,
    name: this.defaultValue,
    position: this.defaultValue,
    giveAdminPrivledges: true,
    longitude: this.defaultValue,
    latitude: this.defaultValue,
    coordinates: this.defaultValue,
    password: this.defaultValue,
    email: this.defaultValue,
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  v2_AdministratorOne: v2_StaffDTO = {
    id: this.defaultValue,
    name: this.defaultValue,
    position: this.defaultValue,
    giveAdminPrivledges: true,
    longitude: this.defaultValue,
    latitude: this.defaultValue,
    coordinates: this.defaultValue,
    password: this.defaultValue,
    email: this.defaultValue,
    addressStreet: '',
    addressSuite: '',
    addressCity: '',
    addressState: '',
    addressPostal_Code: '',
    addressCountry: '',
    phoneNumber: ''
  };

  v2_AdministratorTwo: v2_StaffDTO = {
    id: this.defaultValue,
    name: this.defaultValue,
    position: this.defaultValue,
    giveAdminPrivledges: true,
    longitude: this.defaultValue,
    latitude: this.defaultValue,
    coordinates: this.defaultValue,
    password: this.defaultValue,
    email: this.defaultValue,
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
    name: this.defaultValue,
    description: this.defaultValue,
    phoneNumber: this.defaultValue,
    addressStreet: this.defaultValue,
    addressSuite: this.defaultValue,
    addressCity: this.defaultValue,
    addressState: this.defaultValue,
    addressPostal_Code: this.defaultValue,
    addressCountry: this.defaultValue,
    smallTagline: this.defaultValue,
    menuDescription: this.defaultValue,
    headerImage: this.defaultValue,
    aboutUsImageUrl: this.defaultValue,
    locationImageUrl: this.defaultValue,
    logoImageUrl: this.defaultValue,
    miscImageUrl: this.defaultValue,
    listOfAllProducts: [],
    owner: this.v2_Owner,
    administratorOne: this.v2_AdministratorOne,
    administratorTwo: this.v2_AdministratorTwo
  };

  constructor(public formBuilder: FormBuilder, public v2_authService: v2_AuthService, public router: Router, public v2_companyService: v2_CompanyService)
  {
    this.FORM_newStaff = this.formBuilder.group({
      Email: ['', Validators.email]
    });

    this.FORM_newDev = this.formBuilder.group({
      Email: ['', Validators.email]
    });

    this.FORM_overrideAdmin = this.formBuilder.group({
      userEmail: [String,Validators.email],
      companyId: this.v2_Company.id,
      replaceAdminOneOrTwo: [,]
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
  }

  ngOnInit(): void {
    if (localStorage.getItem(DEV) == "false") {
      this.v2_authService.LOGOUT__USER;
      this.router.navigateByUrl('/');
    }

    const presentationId: number = 1;

    // get company details
    this.v2_companyService.v2_getCompanyDetails(presentationId).subscribe(async (data: v2_CompanyDTO) => {
      this.v2_Company = data;
      return await this.v2_Company;
    });

    // get admin list
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

  companyCreate() {
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

  devCreate() {
    let newDev = new Base__User(this.FORM_newDev.value.Email, this.defaultPassword);

    this.v2_authService.v2_registerDev_Entry(newDev).subscribe({
      next: (res) => {

        this.FORM_newDev.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
