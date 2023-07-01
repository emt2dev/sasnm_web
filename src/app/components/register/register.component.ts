import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authsvc/auth.service';
import { Base__User } from 'src/app/shared/DTOs/APIUsers/Base__APIUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: 
  [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  FORM__REGISTER: FormGroup;
  /**
   *
   */
  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router)
  {
    this.FORM__REGISTER = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.pattern("^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$")]
    });
  }

  ngOnInit() {}

  SUBMIT__REGISTRATION() {
    const NEW__USER = new Base__User(this.FORM__REGISTER.value.email, this.FORM__REGISTER.value.password);

    this.authService.REGISTER__USER(NEW__USER).subscribe({
      next: (res) => {
        this.FORM__REGISTER.reset();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }  
}