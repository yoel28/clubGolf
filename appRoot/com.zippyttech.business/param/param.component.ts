import {Component, OnInit, AfterViewInit} from '@angular/core';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ParamModel} from "./param.model";

declare var SystemJS:any;
@Component({
    selector: 'params',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class ParamComponent implements OnInit,AfterViewInit{

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
        this.model= new ParamModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Parámetros';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el parámetro : ',
            'keyAction':'key'
        };
    }
}