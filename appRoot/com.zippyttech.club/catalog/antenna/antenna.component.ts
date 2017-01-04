import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {AntennaModel} from "./antenna.model";

declare var SystemJS:any;
@Component({
    selector: 'antenna',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class AntennaComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new AntennaModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Antenas';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la antena: ',
            'keyAction':'title'
        };
    }
}
