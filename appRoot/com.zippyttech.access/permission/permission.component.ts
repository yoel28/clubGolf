import {Component} from '@angular/core';
import {PermissionModel} from "./permission.model";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'permission',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class PermissionComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel() {
        this.model= new PermissionModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Permisos';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el permiso : ',
            'keyAction':'code'
        };
    }
}