import {Component} from '@angular/core';
import {RoleModel} from "./role.model";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'role',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class RoleComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel():any {
        this.model= new RoleModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Roles';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el rol : ',
            'keyAction':'authority'
        };
    }
}