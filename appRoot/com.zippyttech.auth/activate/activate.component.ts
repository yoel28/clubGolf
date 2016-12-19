import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute}           from '@angular/router';
import {Http} from '@angular/http';
import {RestController} from "../../com.zippyttech.rest/restController";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";
import {ToastyService} from "ng2-toasty";


declare var SystemJS:any;
@Component({
    selector: 'user-activate',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/activate/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/style.css']
})
export class ActivateComponent extends RestController implements OnInit{
    public activate={'status':false,'response':false};
    public id:string;
    public token:string;
    public pathElements=StaticValues.pathElements;
    public msg=StaticValues.msg;

    constructor(public router:Router, public http:Http,private routeActive: ActivatedRoute,public toastyService:ToastyService) {
        super(http,toastyService);
    }
    ngOnInit():void{
        this.id=this.routeActive.snapshot.params['id'];
        this.token=this.routeActive.snapshot.params['token'];
        this.setEndpoint('/users/activate/' + this.id + "?access_token=" + this.token);
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
        let link = ['/auth/login', {}];
        this.router.navigate(link);
    }
}
