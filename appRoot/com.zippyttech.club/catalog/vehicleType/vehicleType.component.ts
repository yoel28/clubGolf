import {Component} from '@angular/core';
import {VehicleTypeModel} from "./vehicleType.model";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'vehicle-type',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class VehicleTypeComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new VehicleTypeModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Tipo de vehículos';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el tipo : ',
            'keyAction':'title'
        };
    }
}
