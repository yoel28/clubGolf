import {Component} from '@angular/core';
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {ContractModel} from "./contract.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    selector: 'contract',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ContractComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }

    initModel() {
        this.model= new ContractModel(this.db);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Contrato';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el contrato: ',
            'keyAction':'code'
        };
    }
}
