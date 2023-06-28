import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Full__User } from 'src/app/shared/DTOs/APIUsers/Full__APIUser';
import { dto__full__user } from 'src/app/shared/DTOs/APIUsers/dto__full__user';
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

  USER__ID = this.authsvc.returnUserId()!;

  ROLES = this.authsvc.returnRoles();
  
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
  

  constructor(private authsvc: AuthService, private actRoute: ActivatedRoute, private router: Router){

    // const userdetails3 = this.authsvc.getUserProfile(this.USER__ID);
    // this.authsvc.getUserProfile(this.USER__ID).subscribe((res) => {
    //   map((user: Full__User) => {
    //     this.UserFound = user;
    //   });
    // });
          // this.UserFound.Id = user.Id,
          // this.UserFound.Name = user.Name,
          // this.UserFound.PhoneNumber = user.PhoneNumber,
          // this.UserFound.CompanyId = user.CompanyId,
          // this.UserFound.IsStaff = user.IsStaff,
          // this.UserFound.CartList = user.CartList,
          // this.UserFound.OrderList = user.OrderList,
          // this.UserFound.Email = user.Email,
          // this.UserFound.Password = ''      
  }
  ngOnInit(): void {
    // this.UserFound = this.authsvc.getUserProfile(this.USER__ID);
    this.authsvc.getUserProfile(this.USER__ID).subscribe((data: dto__full__user) => {
      this.UserFound=data;
      return this.UserFound;
      // this.UserFound = data;
      // this.UserFound.id = data.id,
      // this.UserFound.Name = data.Name,
      // this.UserFound.PhoneNumber = data.PhoneNumber,
      // this.UserFound.CompanyId = data.CompanyId,
      // this.UserFound.IsStaff = data.IsStaff,
      // this.UserFound.CartList = data.CartList,
      // this.UserFound.OrderList = data.OrderList,
      // this.UserFound.Email = data.Email,
      // this.UserFound.Password = '' 
      // console.log(this.UserFound);
    })
    // const here= this.authsvc.getUserProfile(this.USER__ID).subscribe((res) => {
    //     map((apiResult: Full__User) => {

    //       this.UserFound.Id = apiResult.Id,
    //         this.UserFound.Name = apiResult.Name,
    //         this.UserFound.PhoneNumber = apiResult.PhoneNumber,
    //         this.UserFound.CompanyId = apiResult.CompanyId,
    //         this.UserFound.IsStaff = apiResult.IsStaff,
    //         this.UserFound.CartList = apiResult.CartList,
    //         this.UserFound.OrderList = apiResult.OrderList,
    //         this.UserFound.Email = apiResult.Email;

    //         return apiResult;
    //     });
    //   });
            
            
    this.authsvc.getUserDetails();
    // this.authsvc.getUserProfile(this.USER__ID).subscribe((apiResult) => {
    //   this.UserFound = apiResult;
    // }); 
  }
  
  logout() { this.authsvc.LOGOUT__USER(); this.router.navigateByUrl('/');}
}
