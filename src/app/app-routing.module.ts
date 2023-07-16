import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  // landing here
  {path: '', loadComponent: () => import('./components/landing/landing.component').then((modulePart) => modulePart.LandingComponent),},
  // customer login here
  {path: 'login', loadComponent: () => import('./components/login/login.component').then((modulePart) => modulePart.LoginComponent),},
  // dev login here
  {path: 'dlogin', loadComponent: () => import('./components/dlogin/dlogin.component').then((modulePart) => modulePart.DloginComponent),},
  // staff login here
  {path: 'slogin', loadComponent: () => import('./components/slogin/slogin.component').then((modulePart) => modulePart.SloginComponent),},
  // customer register here
  {path: 'register', loadComponent: () => import('./components/register/register.component').then((modulePart) => modulePart.RegisterComponent),},
  // customer dashboard
  {path: 'dashboard', loadComponent: () => import('./components/user-dashboard/user-dashboard.component').then((modulePart) => modulePart.UserDashboardComponent), canActivate: []},
  // stripe payment success
  {path: 'success', loadComponent: () => import('./components/success/success.component').then((modulePart) => modulePart.SuccessComponent), canActivate: []},
  // stripe payment failed
  {path: 'cancel', loadComponent: () => import('./components/cancel/cancel.component').then((modulePart) => modulePart.CancelComponent), canActivate: []},
  // dev dashboard
  {path: 'dev', loadComponent: () => import('./components/dev/dev.component').then((modulePart) => modulePart.DevComponent), canActivate: []},
  // staff dashboard
  {path: 'staff', loadComponent: () => import('./components/staff/staff.component').then((modulePart) => modulePart.StaffComponent), canActivate: []},
];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
