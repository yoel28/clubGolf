import {Component} from '@angular/core';
import {BrandModel} from "./brand.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    selector: 'vehicle-brand',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class BrandComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }

    initModel() {
        this.model= new BrandModel(this.db);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Marcas de vehículos';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la marca: ',
            'keyAction':'title'
        };
    }
}
