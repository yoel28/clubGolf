import {Component, OnInit} from '@angular/core';
import  {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router}           from '@angular/router';
import {Http} from '@angular/http';
import {RestController} from "../../../com.zippyttech.rest/restController";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {contentHeaders} from "../../../com.zippyttech.rest/headers";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

declare var SystemJS:any;

@Component({
    selector: 'user-login',
    templateUrl: SystemJS.map.app+'com.zippyttech.auth/user/login/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.auth/user/style.css']
})
export class LoginComponent extends RestController implements OnInit{

    public submitForm:boolean = false;
    public msg=StaticValues.msg;
    public pathElements = StaticValues.pathElements;
    
    form:FormGroup;

    constructor(public router:Router, public http:Http, public myglobal:globalService,public af: AngularFire) {
        super(http);
        this.af.auth.subscribe(auth => console.log(auth));
        this.setEndpoint("/login");
    }
    ngOnInit(){
        this.initForm();
    }

    initForm() {
        this.form = new FormGroup({
            username:new FormControl ("", Validators.compose([Validators.required])),
            password: new FormControl ("", Validators.compose([Validators.required]))
        });
    }

    login(event:Event) {
        event.preventDefault();
        let that=this;
        let body = JSON.stringify(this.form.value);
        this.submitForm = true;
        let errorLogin = (error:any)=> {
            that.submitForm = false;
        }
        let successCallback = (response:any) => {
            that.submitForm = false;
            that.myglobal.init=false;
            localStorage.setItem('bearer', response.json().access_token);
            contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('bearer'));
            that.myglobal.initSession();
            let link = ['/dashboard', {}];
            that.router.navigate(link);
        };
        this.httputils.doPost(this.endpoint, body, successCallback, errorLogin);
    }
    onRecover(event:Event){
        if(event)
            event.preventDefault();
        
        let link = ['/auth/recover', {}];
        this.router.navigate(link);
    }

    loginSocial(event:Event,social) {
        if(event)
            event.preventDefault();

        let auth;
        switch (social){
            case 'fb':
                auth=AuthProviders.Facebook;
                break;
            case 'tw':
                auth=AuthProviders.Twitter;
                break;
            case 'go':
                auth=AuthProviders.Google;
                break;
        }

        this.af.auth.login({
            provider: auth,
            method: AuthMethods.Popup,
        });
    }
}