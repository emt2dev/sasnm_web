import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';

@Component({
  selector: 'app-slogin',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './slogin.component.html',
  styleUrls: ['./slogin.component.css']
})
export class SloginComponent implements OnInit {
  FORM__LOGIN: FormGroup;

  constructor(public formBuilder: FormBuilder, public v2_authService: v2_AuthService, public router: Router)
  {
    this.FORM__LOGIN = this.formBuilder.group({
      Email: ['', Validators.email],
      Password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
    });
  }
  ngOnInit(){}

  staffLogin() {
    const existingStaff = new Base__User(this.FORM__LOGIN.value.Email, this.FORM__LOGIN.value.Password);

    this.v2_authService.v2_LoginStaff(existingStaff).subscribe({
      next: (res) => {

        this.router.navigateByUrl('/staff');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
