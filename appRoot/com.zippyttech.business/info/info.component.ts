import {Component} from '@angular/core';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {InfoModel} from "./info.model";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;

@Component({
    selector: 'info',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],

})
export class InfoComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel() {
        this.model= new InfoModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Informacion (Ayudas)';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la accion : ',
            'keyAction':'code'
        };
    }
}

