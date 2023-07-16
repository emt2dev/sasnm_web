import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { v2_AuthService } from 'src/app/shared/authsvc/v2_auth.service';

@Component({
  selector: 'app-dlogin',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './dlogin.component.html',
  styleUrls: ['./dlogin.component.css']
})
export class DloginComponent implements OnInit {
  FORM__LOGIN: FormGroup;

  constructor(public formBuilder: FormBuilder, public v2_authService: v2_AuthService, public router: Router)
  {
    this.FORM__LOGIN = this.formBuilder.group({
      Email: ['', Validators.email],
      Password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
    });
  }
  ngOnInit(){}

  devLogin() {
    const existingDev = new Base__User(this.FORM__LOGIN.value.Email, this.FORM__LOGIN.value.Password);

    this.v2_authService.v2_LoginDeveloper(existingDev).subscribe({
      next: (res) => {

        this.router.navigateByUrl('/dev');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
