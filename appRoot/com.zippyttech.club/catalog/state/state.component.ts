import {Component} from '@angular/core';
import {StateModel} from "./state.model";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'status',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class StatusComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new StateModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Estados';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el estado : ',
            'keyAction':'code'
        };
    }
}