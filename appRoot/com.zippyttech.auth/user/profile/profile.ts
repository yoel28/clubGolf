import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Router }           from '@angular/router-deprecated';
import { Http} from '@angular/http';
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";
import {XEditable} from "../../../com.zippyttech.utils/directive/xEditable";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {MUser} from "../mUser";
import {ImageEdit} from "../../../com.zippyttech.ui/components/imageEdit/imageEdit";

declare var SystemJS:any;

@Component({
    selector: 'user-profile',
    templateUrl: SystemJS.map.app+'/com.zippyttech.auth/user/profile/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.auth/user/profile/style.css'],
    directives: [XEditable,ImageEdit],
    providers: [TranslateService],
    pipes: [TranslatePipe]
})
export class UserProfile extends ControllerBase implements OnInit,AfterViewInit{
    
    public msg= StaticValues.msg;

    constructor(public router:Router, public http:Http, public toastr:ToastsManager, public myglobal:globalService, public translate:TranslateService) {
        super('USER','/users/',router,http,toastr,myglobal,translate);
    }
    ngOnInit():any
    {
        this.initModel();
        this.loadPage();
    }
    initModel():any{
        this.model = new MUser(this.myglobal);
    }
    ngAfterViewInit():any{
    }

    saveImage(data){
        this.onPatchValue('image',this.myglobal.user,data);
    }

}
