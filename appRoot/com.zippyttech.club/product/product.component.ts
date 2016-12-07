import {Component, OnInit, AfterViewInit} from '@angular/core';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ProductModel} from "./product.model";

declare var SystemJS:any;
@Component({
    selector: 'product',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ProductComponent implements OnInit,AfterViewInit{

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