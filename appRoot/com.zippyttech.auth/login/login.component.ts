import {Component, OnInit, OnDestroy} from '@angular/core';
import  {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute}           from '@angular/router';
import {Http} from '@angular/http';
import {RestController} from "../../com.zippyttech.rest/restController";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {contentHeaders} from "../../com.zippyttech.rest/headers";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {AnimationsManager} from "../../com.zippyttech.ui/animations/AnimationsManager";

declare var SystemJS:any;

@Component({
    selector: 'user-login',
    templateUrl: SystemJS.map.app+'com.zippyttech.auth/login/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.auth/style.css'],
    animations: AnimationsManager.getTriggers("d-expand_down",200)
})
export class LoginComponent extends RestController implements OnInit,OnDestroy{

    public submitForm:boolean = false;
    public msg=StaticValues.msg;
    public pathElements = StaticValues.pathElements;
    public context:any={'company':null,'public':{}};
    
    form:FormGroup;
    public subcribe;

    constructor(public router:Router, public http:Http, public myglobal:globalService,public af: AngularFire,private routeActive: ActivatedRoute,public toastyService:ToastyService,toastyConfig:ToastyConfig) {
        super(http,toastyService,toastyConfig);
        let that = this;
        this.setEndpoint("/login");
    }
    loginFirebase(token){
        let that = this;
        let json={};
        json['token']=token;
        json['TokenFCM']='';
        let successCallback= response => {
            localStorage.setItem('bearer', response.json().tokenValue);
            contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('bearer'));
            let link = ['/init/load', {}];
            that.router.navigate(link);
        };
        return this.httputils.doPost(localStorage.getItem('url')+'/tokens/'+this.context.company+'/firebaseToken',JSON.stringify(json),successCallback,this.error,true)
    }
    ngOnInit(){
        this.initForm();
        this.context.company=this.routeActive.snapshot.params['company'];
        if(!this.context.company)
            this.context.company='zippyttech';
        if(this.context.company){
            this.loadContextPublic();
            (<FormControl>this.form.controls['company']).setValue(this.context.company);
        }
    }
    loadContextPublic(){
        let that = this;
        let successCallback= response => {
            Object.assign(that.context.public, response.json());
            that.pathElements.logo = that.context.public.logo || that.pathElements.logo;
            that.pathElements.logoBlanco = that.context.public.logo || that.pathElements.logo;
            that.pathElements.isotipo = that.context.public.miniLogo || that.pathElements.isotipo;
        };
        this.httputils.doGet(localStorage.getItem('url')+'/context/'+this.context.company,successCallback,this.error,true);
    }

    initForm() {
        this.form = new FormGroup({
            username:new FormControl ("", Validators.compose([Validators.required])),
            password: new FormControl ("", Validators.compose([Validators.required])),
            company: new FormControl ("", Validators.compose([Validators.required]))
        });
    }

    login(event:Event) {
        event.preventDefault();
        let that=this;
        let body = Object.assign({},this.form.value);
        body['username'] = body['company']+'/'+body['username'];
        this.submitForm = true;
        let errorLogin = (error:any)=> {
            that.submitForm = false;
            that.error(error);
        }
        let successCallback = (response:any) => {
            that.submitForm = false;
            localStorage.setItem('bearer', response.json().access_token);
            contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('bearer'));
            let link = ['/init/load', {}];
            that.router.navigate(link);
        };
        this.httputils.doPost(this.endpoint, JSON.stringify(body), successCallback, errorLogin);
    }
    onRecover(event:Event){
        if(event)
            event.preventDefault();
        
        let link = ['/auth/recover', {}];
        this.router.navigate(link);
    }
    ngOnDestroy(){
        if(this.subcribe)
            this.subcribe.unsubscribe();
        this.subcribe = null;
    }
    loginSocial(event:Event,social) {
        if(event)
            event.preventDefault();

        let auth;
        let that=this;
        this.subcribe=this.af.auth.subscribe(
            (response:any)=>{
                if(that.context.company)
                    if(response && response.auth && !localStorage.getItem('bearer'))
                        that.loginFirebase(response.auth.kd);
            },
            error=>{
                console.log(error.message);
            }
        );
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