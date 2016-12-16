import {Component} from '@angular/core';
import {VehicleModel} from "./vehicle.model";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'vehicle',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class VehicleComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new VehicleModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Vehículos';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el vehículo con la placa : ',
            'keyAction':'plate'
        };
    }
}