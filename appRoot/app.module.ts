import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {FirebaseModule} from 'ng2-firebase/core';
import {TranslateLoader,TranslateStaticLoader,TranslateModule} from 'ng2-translate';
import './rxjs-extensions';

import {AppRoutingModule, componentsApp, componentsDefault, componentsView} from './app-routing.module';
import {globalService} from "./com.zippyttech.utils/globalService";
import {AppComponent} from "./com.zippyttech.base/app/app.component";
import {LocationStrategy,HashLocationStrategy} from "@angular/common";
import {directivesApp, directivesDefault} from "./app.directives";

const myFirebaseConfig = {
    apiKey: 'AIzaSyB-zakSU1icljHu4o7oENkAC4korzIF5OI',
    authDomain: 'ipanama-366c4.firebaseapp.com',
    databaseURL: "https://ipanama-366c4.firebaseio.com",
    storageBucket: "ipanama-366c4.appspot.com"
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        AngularFireModule.initializeApp(myFirebaseConfig),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    declarations: [
        AppComponent,
        componentsApp,
        componentsDefault,
        componentsView,
        directivesApp,
        directivesDefault
    ],
    providers: [
        globalService,
        {provide:LocationStrategy,useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
