import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {CompanyModel} from "./company.model";

declare var SystemJS:any;
@Component({
    selector: 'company',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class CompanyComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new CompanyModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Empresas';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la empresa: ',
            'keyAction':'title'
        };
    }
}
