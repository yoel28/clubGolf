import {Component, OnInit} from '@angular/core';
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {UserModel} from "../user.model";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {VehicleModel} from "../../../com.zippyttech.club/catalog/vehicle/vehicle.model";

declare var SystemJS:any;

@Component({
    moduleId:module.id,
    selector: 'user-profile',
    templateUrl: 'index.html',
    styleUrls: ['style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class ProfileComponent extends ControllerBase{
    public vehicleModel:VehicleModel;
    constructor(public db:DependenciesBase) {
        super(db);
        this.vehicleModel = new VehicleModel(this.db);
    }
    public qrList=[];
    initModel():any{
        let that = this;
        this.model = new UserModel(this.db);
        this.model.updateProfile();
        this.vehicleModel.paramsSearch.where = [{'op': 'eq', 'field': 'user.id', 'value': this.db.myglobal.user.id}];
        this.vehicleModel.rest = {
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