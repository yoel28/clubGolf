import {Component, OnInit} from '@angular/core';
import  {Validators, FormGroup,FormControl} from '@angular/forms';
import {Router, ActivatedRoute}           from '@angular/router';
import {Http} from '@angular/http';
import {RestController} from "../../../com.zippyttech.rest/restController";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
@Component({
    selector: 'user-recover-password',
    templateUrl: SystemJS.map.app+'com.zippyttech.auth/user/recoverPassword/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.auth/user/style.css']
})
export class RecoverPasswordComponent extends RestController implements OnInit  {

    form:FormGroup;
    id:string;
    token:string;
    public pathElements=StaticValues.pathElements;
    public msg=StaticValues.msg;

    constructor(public router:Router, public http:Http,private routeActive: ActivatedRoute) {
        super(http);
    }
    ngOnInit():void{
        let that=this;
        this.id=this.routeActive.snapshot.params['id'];
        this.token=this.routeActive.snapshot.params['token'];
        this.setEndpoint('/users/' + this.id + "?access_token=" + this.token);

        this.initForm();
    }
    initForm() {
        this.form = new FormGroup({
            password: new FormControl ("", Validators.compose([Validators.required]))
        });
    }
    recoverPassword(event){
        let that=this;
        event.preventDefault();

        let body = JSON.stringify({'password':this.form.value.password});
        let successCallback= response => {
            let link = ['/auth/login', {}];
            that.router.navigate(link);
        }
        this.httputils.doPut(this.endpoint,body,successCallback,this.error)
    }

    onLogin(event){
        event.preventDefault();
        let link = ['/auth/login', {}];
        this.router.navigate(link);
    }
}