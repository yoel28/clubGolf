import {Component} from '@angular/core';
import {Router, RouteParams}           from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {RestController} from "../../../com.zippyttech.rest/restController";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
@Component({
    selector: 'user-activate',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/user/activate/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/user/style.css']
})
export class UserActivate extends RestController {
    public activate={'status':false,'response':false};
    public pathElements=StaticValues.pathElements;
    public msg=StaticValues.msg;

    constructor(public params:RouteParams, public router:Router, public http:Http) {
        super(http);
        this.setEndpoint('/users/activate/' + params.get('id') + "?access_token=" + params.get('token'));
        this.validate();
    }
    validate() {
        let that=this;
        let successCallback = response => {
            that.activate.response=true;
            that.activate.status = true;
        }
        let errorCallback = err => {
            that.activate.response=true;
        }
        this.httputils.doGet(this.endpoint, successCallback, errorCallback)
    }
    onLogin(event){
        event.preventDefault();
        let link = ['UserLogin', {}];
        this.router.navigate(link);
    }
}
