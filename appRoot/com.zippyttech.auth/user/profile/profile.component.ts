import {Component, OnInit, AfterViewInit, NgModule} from '@angular/core';
import { Router }           from '@angular/router';
import { Http} from '@angular/http';
import {XEditable} from "../../../com.zippyttech.utils/directive/xEditable";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {UserModel} from "../user.model";
import {ImageEditComponent} from "../../../com.zippyttech.ui/components/imageEdit/imageEdit.component";

declare var SystemJS:any;
@NgModule({
    imports:[XEditable,ImageEditComponent]
})
@Component({
    moduleId: module.id,
    selector: 'user-profile',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/user/profile/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/user/profile/style.css'],
})
export class ProfileComponent extends ControllerBase implements OnInit,AfterViewInit{
    
    public msg= StaticValues.msg;

    constructor(public router:Router, public http:Http, public myglobal:globalService) {
        super('USER','/users/',router,http,myglobal);
    }
    ngOnInit():any
    {
        this.initModel();
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
