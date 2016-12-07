import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {ProductModel} from "./product.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'product',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ProductComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new ProductModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Producto';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el producto: ',
            'keyAction':'code'
        };
    }
}
