import {Component} from '@angular/core';
import {ProductTypeModel} from "./productType.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    selector: 'type-product',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ProductTypeComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }
    initModel() {
        this.model= new ProductTypeModel(this.db);
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
