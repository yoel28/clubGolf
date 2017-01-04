import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {LocationModel} from "./location.model";

declare var SystemJS:any;
@Component({
    selector: 'location',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class LocationComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new LocationModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Ubicaciones';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la ubicacion: ',
            'keyAction':'title'
        };
    }
}
