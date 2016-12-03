import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from "./com.zippyttech.base/dashboard/dashboard.component";
import {LoginComponent} from "./com.zippyttech.auth/user/login/login.component";
import {RecoverComponent} from "./com.zippyttech.auth/user/recover/recover.component";
import {RecoverPasswordComponent} from "./com.zippyttech.auth/user/recoverPassword/recoverpassword.component";

const routesDefault: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/recover',
    component: RecoverComponent
  },
  {
    path: 'account/recoverPassword/:id/:token',
    component: RecoverPasswordComponent
  },
];
const routesApp:Routes=[];
@NgModule({
  imports: [RouterModule.forRoot(routesDefault.concat(routesApp))],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const componentsDefault = [DashboardComponent,LoginComponent,RecoverComponent,RecoverPasswordComponent];
export const componentsApp = [];

