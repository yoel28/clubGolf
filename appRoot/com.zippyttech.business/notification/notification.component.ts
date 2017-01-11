import {Component} from '@angular/core';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {NotificationModel} from "./notification.model";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;

@Component({
    selector: 'notification',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],

})
export class NotificationComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel() {
        this.model= new NotificationModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Notificaciones';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la accion : ',
            'keyAction':'title'
        };
    }
}

