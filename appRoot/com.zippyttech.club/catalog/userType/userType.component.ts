import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {UserTypeModel} from "./userType.model";

declare var SystemJS:any;
@Component({
    selector: 'user-type',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class UserTypeComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new UserTypeModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Tipos de usuarios';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el tipo de usuario: ',
            'keyAction':'code'
        };
    }
}
