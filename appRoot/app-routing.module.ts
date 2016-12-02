import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from "./com.zippyttech.base/dashboard/dashboard.component";
import {LoginComponent} from "./com.zippyttech.auth/user/login/login.component";
import {RecoverComponent} from "./com.zippyttech.auth/user/recover/recover.component";
import {RecoverPasswordComponent} from "./com.zippyttech.auth/user/recoverPassword/recoverpassword.component";
import {AclComponent} from "./com.zippyttech.auth/acl/acl.component";
import {ProfileComponent} from "./com.zippyttech.auth/user/profile/profile.component";

const routes: Routes = [
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
  {
    path: 'auth/acl',
    component: AclComponent
  },
  {
    path: 'user/profile',
    component: ProfileComponent
  },
  {
    path: 'auth/permission',
    component: AclComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [DashboardComponent,LoginComponent,RecoverComponent,RecoverPasswordComponent,AclComponent,ProfileComponent];
