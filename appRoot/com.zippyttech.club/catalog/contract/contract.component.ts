import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {ContractModel} from "./contract.model";

declare var SystemJS:any;
@Component({
    selector: 'contract',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ContractComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new ContractModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Contracto';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el contracto: ',
            'keyAction':'code'
        };
    }
}
