import {Component} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router}           from '@angular/router';
import {Http} from '@angular/http';
import {RestController} from "../../com.zippyttech.rest/restController";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";
import {ToastyService, ToastyConfig} from "ng2-toasty";

declare var SystemJS:any;
@Component({
    selector: 'user-recover',
    templateUrl: SystemJS.map.app+'com.zippyttech.auth/recover/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.auth/style.css']
})
export class RecoverComponent extends RestController {

    public pathElements=StaticValues.pathElements;
    public msg=StaticValues.msg;
    
    form:FormGroup;

    constructor(public router:Router, public http:Http,public toastyService:ToastyService,toastyConfig:ToastyConfig) {
        super(http,toastyService,toastyConfig);
        this.setEndpoint(localStorage.getItem('url')+'/users/recover/');
        this.initForm();
    }
    initForm() {
        this.form = new FormGroup({
            username:new FormControl ("", Validators.compose([Validators.required])),
        });
    }
    recoverPassword(event:Event){
        event.preventDefault();
        let that= this;
        let successCallback= response => {
            let link = ['/auth/login', {}];
            that.router.navigate(link);
        }
        this.httputils.doGet(this.endpoint+this.form.value.username,successCallback,this.error,true);
    }
    onLogin(event:Event){
        event.preventDefault();
        let link = ['/auth/login', {}];
        this.router.navigate(link);
    }
}