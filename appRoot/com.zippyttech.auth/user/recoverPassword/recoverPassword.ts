import {Component} from '@angular/core';
import  {FormBuilder, Validators, Control, ControlGroup} from '@angular/common';
import {Router, RouteParams}           from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {RestController} from "../../../com.zippyttech.rest/restController";

declare var SystemJS:any;
@Component({
    selector: 'user-recover-password',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/user/recoverPassword/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/user/style.css']
})
export class UserRecoverPassword extends RestController {

    form:ControlGroup;
    password:Control;

    constructor(public params:RouteParams, public router:Router, public http:Http, public _formBuilder:FormBuilder,public toastr: ToastsManager) {
        super(http,toastr);
        this.setEndpoint('/users/' + params.get('id') + "?access_token=" + params.get('token'));
        this.initForm();
    }
    initForm() {
        this.password = new Control("", Validators.compose([Validators.required,Validators.minLength(4)]));
        this.form = this._formBuilder.group({
            password: this.password,
        });
    }
    recoverPassword(event){
        event.preventDefault();
        let body = JSON.stringify({'password':this.password.value});
        let successCallback= response => {
            this.toastr.success('Contraseña Actualizada','Solicitud Procesada.');
            let link = ['UserLogin', {}];
            this.router.navigate(link);
        }
        this.httputils.doPut(this.endpoint,body,successCallback,this.error)
    }

    onLogin(event){
        if(event)
            event.preventDefault();
        let link = ['UserLogin', {}];
        this.router.navigate(link);
    }
}