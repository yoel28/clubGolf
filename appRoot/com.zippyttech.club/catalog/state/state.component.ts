import {Component, OnInit, AfterViewInit} from '@angular/core';
import {StateModel} from "./state.model";
import {globalService} from "../../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'status',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class StatusComponent implements OnInit,AfterViewInit{

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
        this.model= new StateModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Estados';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el estado : ',
            'keyAction':'code'
        };
    }
}