import {Component} from '@angular/core';
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {RecordModel} from "./record.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    selector: 'record-list',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class RecordComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }

    initModel() {
        this.model= new RecordModel(this.db);

        this.model.rules['userContractCode']={
            'type': 'text',
            'visible':true,
            'key': 'userContractCode',
            'title': 'Contrato',
        };
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Registro de acceso';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el registro: ',
            'keyAction':'id'
        };
    }
}
