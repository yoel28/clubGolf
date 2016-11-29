import {Component} from '@angular/core';
import  {FormBuilder, Validators, Control, ControlGroup} from '@angular/common';
import {Router}           from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../../../com.zippyttech.rest/restController";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";


declare var SystemJS:any;
@Component({
    selector: 'user-recover',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/user/recover/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/user/style.css']
})
export class UserRecover extends RestController {

    public pathElments=StaticValues.pathElements;
    public msg=StaticValues.msg;
    
    form:ControlGroup;
    username:Control;

    constructor(public router:Router, public http:Http, public _formBuilder:FormBuilder,public toastr: ToastsManager) {
        super(http,toastr);
        this.setEndpoint(localStorage.getItem('url')+'/users/recover/');
        this.initForm();
    }
    initForm() {
        this.username = new Control("", Validators.compose([Validators.required]));
        this.form = this._formBuilder.group({
            username: this.username,
        });
    }
    recoverPassword(event){
        if(event)
            event.preventDefault();
        
        let that= this;
        
        let successCallback= response => {
            this.toastr.success(that.msg.sendEmail,that.msg.processedRequest);
            let link = ['UserLogin', {}];
            this.router.navigate(link);
        }
        this.httputils.doGet(this.endpoint+this.username.value,successCallback,this.error,true);
    }
    onLogin(event){
        if(event)
            event.preventDefault();
        let link = ['UserLogin', {}];
        this.router.navigate(link);
    }
}