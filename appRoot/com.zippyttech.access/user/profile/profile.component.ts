import {Component, OnInit, AfterViewInit, NgModule} from '@angular/core';
import { Router }           from '@angular/router';
import { Http} from '@angular/http';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {UserModel} from "../user.model";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";


declare var SystemJS:any;

@Component({
    selector: 'user-profile',
    templateUrl: SystemJS.map.app+'/com.zippyttech.access/user/profile/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.access/user/profile/style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class ProfileComponent extends ControllerBase implements OnInit,AfterViewInit{
    
    public msg= StaticValues.msg;

    constructor(public router:Router, public http:Http, public myglobal:globalService,public toastyService:ToastyService,public toastyConfig:ToastyConfig) {
        super('USER','/users/',router,http,myglobal,toastyService,toastyConfig);
    }
    ngOnInit():any
    {
        super.ngOnInit();
        this.loadPage();
    }
    initModel():any{
        this.model = new UserModel(this.myglobal);
    }
    ngAfterViewInit():any{
    }

    saveImage(data){
        this.onPatchValue('image',this.myglobal.user,data);
    }

}
