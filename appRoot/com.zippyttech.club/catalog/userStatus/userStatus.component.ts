import {Component} from '@angular/core';
import {UserStatusModel} from "./userStatus.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    selector: 'user-status',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class UserStatusComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }
    initModel():any {
        this.model= new UserStatusModel(this.db);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Estados de usuarios';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el estado : ',
            'keyAction':'title'
        };
    }
}