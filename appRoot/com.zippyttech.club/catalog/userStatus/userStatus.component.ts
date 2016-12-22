import {Component} from '@angular/core';
import {UserStatusModel} from "./userStatus.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {globalService} from "../../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'user-status',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class UserStatusComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel():any {
        this.model= new UserStatusModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Estatus de usuarios';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el estatus : ',
            'keyAction':'title'
        };
    }
}