import {Component} from '@angular/core';
import {AccountModel} from "./account.model";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'account',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class AccountComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel():any {
        this.model= new AccountModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Cuentas';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la cuenta: ',
            'keyAction':'authority'
        };
    }
}