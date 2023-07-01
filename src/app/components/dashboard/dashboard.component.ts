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

// export interface userdetails {
//   Id: '',
//   Name: '',
//   PhoneNumber: '',
//   CompanyId: '',
//   IsStaff: Boolean,
//   CartList: [],
//   OrderList: [],
//   Email: '',
//   Password: '',
// };

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

  FORM__API__ADMIN__REGISTER: FormGroup;
  FORM__API__ADMIN__CREATE__COMPANY: FormGroup;
  FORM__API__ADMIN__OVERRIDE__COMPANY__ADMIN: FormGroup;

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
  }
  ngOnInit(): void {
    // this.UserFound = this.authsvc.getUserProfile(this.USER__ID);
    this.authsvc.getUserProfile(this.USER__ID).subscribe((data: dto__full__user) => {
      this.UserFound=data;

      return this.UserFound;
    })
                
    this.authsvc.getUserDetails();

    if (this.ROLES?.includes('API_Admin')) {
      // const allCompanies = this.authsvc.getAllCompanies();
      // const allCompanies = this.authsvc.getFullCompanyList();
      // this.COMPANY__LIST = this.authsvc.getAllCompanies();
      const test = this.authsvc.getAllCompanies();
      test.forEach(element => {
        this.COMPANY__LIST.push(element);

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

  logout() { this.authsvc.LOGOUT__USER(); this.router.navigateByUrl('/');}
}
