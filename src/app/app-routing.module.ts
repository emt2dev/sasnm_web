import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', loadComponent: () => import('./components/landing/landing.component').then((modulePart) => modulePart.LandingComponent),},

  {path: 'login', loadComponent: () => import('./components/login/login.component').then((modulePart) => modulePart.LoginComponent),},
  
  {path: 'register', loadComponent: () => import('./components/register/register.component').then((modulePart) => modulePart.RegisterComponent),},

  {path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then((modulePart) => modulePart.DashboardComponent), canActivate: []},
  
  {path: 'dev', loadComponent: () => import('./dev/dev.component').then((modulePart) => modulePart.DevComponent)},

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
