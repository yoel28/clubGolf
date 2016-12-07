import {Component, OnInit, AfterViewInit} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {ProductTypeModel} from "./productType.model";

declare var SystemJS:any;
@Component({
    selector: 'type-product',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ProductTypeComponent implements OnInit,AfterViewInit{

    public instance:any={};
    public paramsTable:any={};
    public model:any;
    public viewOptions:any={};

    constructor(public myglobal:globalService) {}

    ngOnInit(){
        this.initModel();
        this.initViewOptions();
        this.loadParamsTable();
    }

    ngAfterViewInit():any {
        this.instance = {
            'model':this.model,
            'viewOptions':this.viewOptions,
            'paramsTable':this.paramsTable
        };
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
