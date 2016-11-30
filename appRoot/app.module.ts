import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {FirebaseModule} from 'ng2-firebase/core';
import './rxjs-extensions';

import {AppRoutingModule, routedComponents} from './app-routing.module';
import {globalService} from "./com.zippyttech.utils/globalService";
import {AppComponent} from "./com.zippyttech.base/app/app.component";
import {LocationStrategy,HashLocationStrategy} from "@angular/common";

const myFirebaseConfig = {
    apiKey: 'AIzaSyB-zakSU1icljHu4o7oENkAC4korzIF5OI',
    authDomain: 'ipanama-366c4.firebaseapp.com',
    databaseURL: "https://ipanama-366c4.firebaseio.com",
    storageBucket: "ipanama-366c4.appspot.com"
};
enableProdMode();
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        AngularFireModule.initializeApp(myFirebaseConfig)
    ],
    declarations: [
        AppComponent,
        routedComponents
    ],
    providers: [
        globalService,
        {provide:LocationStrategy,useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
