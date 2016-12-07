import {Component, OnInit, AfterViewInit} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {ProductTypeModel} from "./productType.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'type-product',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ProductTypeComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }
    initModel() {
        this.model= new ProductTypeModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Tipo de producto';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el tipo: ',
            'keyAction':'title'
        };
    }
}
