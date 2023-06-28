import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';
import { AuthService } from 'src/app/shared/authsvc/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  FORM__LOGIN: FormGroup;

  /**
   *
   */
  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router)
  {
    this.FORM__LOGIN = this.formBuilder.group({
      Email: ['', Validators.email],
      Password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
    });
  }

  ngOnInit() {}

  SUBMIT__LOGIN() {
    const EXISTING__USER = new Base__User(this.FORM__LOGIN.value.Email, this.FORM__LOGIN.value.Password);

    this.authService.LOGIN__USER(EXISTING__USER).subscribe({
      next: (res) => {

        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
