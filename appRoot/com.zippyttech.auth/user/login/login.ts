import {Component, OnInit} from '@angular/core';
import  {FormBuilder, Validators, Control, ControlGroup} from '@angular/common';
import {Router}           from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../../../com.zippyttech.rest/restController";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {contentHeaders} from "../../../com.zippyttech.rest/headers";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
@Component({
    selector: 'user-login',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/user/login/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/user/style.css']
})
export class UserLogin extends RestController implements OnInit{

    public submitForm:boolean = false;
    public msg=StaticValues.msg;
    public pathElements = StaticValues.pathElements;
    
    form:ControlGroup;
    username:Control;
    password:Control;

    constructor(public router:Router, public http:Http, public _formBuilder:FormBuilder, public myglobal:globalService,public toastr: ToastsManager) {
        super(http);
        this.setEndpoint("/login");
    }
    ngOnInit(){
        this.initForm();
    }

    initForm() {
        this.username = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required]));
        this.form = this._formBuilder.group({
            username: this.username,
            password: this.password,
        });
    }

    login(event) {
        if(event)
            event.preventDefault();

        let that=this;
        let body = JSON.stringify(this.form.value);
        this.submitForm = true;
        let errorLogin = error=> {
            that.submitForm = false;
            that.toastr.error('Usuario o contraseña inválida');
        }
        let successCallback = response => {
            that.submitForm = false;
            that.myglobal.init=false;
            localStorage.setItem('bearer', response.json().access_token);
            contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('bearer'));
            that.myglobal.initSession();
            let link = ['Dashboard', {}];
            that.router.navigate(link);
        };
        this.httputils.doPost(this.endpoint, body, successCallback, errorLogin);
    }
    recover(event){
        if(event)
            event.preventDefault();
        
        let link = ['UserRecover', {}];
        this.router.navigate(link);
    }

}