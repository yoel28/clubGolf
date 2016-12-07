import {Component} from '@angular/core';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ParamModel} from "./param.model";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'params',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ParamComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel() {
        this.model= new ParamModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Parámetros';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el parámetro : ',
            'keyAction':'key'
        };
    }
}