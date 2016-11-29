import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import {globalService} from "./com.zippyttech.utils/globalService";
import {AppComponent} from "./com.zippyttech.base/app/app.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    routedComponents
  ],
  providers: [
    globalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
