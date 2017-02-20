import {Component, OnInit} from '@angular/core';
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
export class ProfileComponent extends ControllerBase implements OnInit{
    public restVeh:IRest;
    constructor(public db:DependenciesBase) {
        super(db);
    }
    ngOnInit():any
    {
        super.ngOnInit();
        this.loadPage();
    }

    public qrList=[];
    initModel():any{
        let that = this;
        this.model = new UserModel(this.db);
        this.model.updateProfile();
        this.restVeh= {
            'where': [{'op': 'eq', 'field': 'user.id', 'value': this.db.myglobal.user.id}],
            'max': 5,
            'offset':0,
        };
        let successCallback= response => {
            let data = response.json();
            if(typeof data === 'object' && data.length){
                data.forEach(obj=>{
                    that.qrList.push({'id':obj.id,'sponsorContract':obj.sponsorContract})
                })
            }
        };
        this.model.httputils.doGet('/current/qr',successCallback,this.model.error);
    }

    saveImage(data){
        this.model.onPatchProfile('image',this.db.myglobal.user,data);
    }

}