import {Component} from '@angular/core';
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {UserGroupModel} from "./userGroup.model";

declare var SystemJS:any;
@Component({
    selector: 'user-group',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class UserGroupComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }

    initModel() {
        this.model= new UserGroupModel(this.db);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Grupos de usuarios';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el grupo de usuario: ',
            'keyAction':'code'
        };
    }
}
