import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {UserModel} from "../user.model";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IRest} from "../../../com.zippyttech.rest/restController";

declare var SystemJS:any;

@Component({
    selector: 'user-profile',
    templateUrl: SystemJS.map.app+'/com.zippyttech.access/user/profile/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.access/user/profile/style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class ProfileComponent extends ControllerBase implements OnInit,AfterViewInit {

    public restVeh:IRest;

    constructor(public db:DependenciesBase) {
        super(db,'USER','/users/');
    }
    ngOnInit():any
    {
        super.ngOnInit();
        this.loadPage();
    }

    initModel():any{
        this.model = new UserModel(this.db);
        this.restVeh= {
            'where': [{'op': 'eq', 'field': 'user.id', 'value': this.db.myglobal.user.id}],
            'max': 5,
            'offset':0,
        };

    }
    ngAfterViewInit():any{
    }

    saveImage(data){
        this.onPatchValue('image',this.db.myglobal.user,data);
    }

}
