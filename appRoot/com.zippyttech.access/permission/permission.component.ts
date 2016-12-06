import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PermissionModel} from "./permission.model";
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'permission',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class PermissionComponent implements OnInit,AfterViewInit{

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
        this.model= new PermissionModel(this.myglobal);
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Permisos';
    }
    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el permiso : ',
            'keyAction':'code'
        };
    }
}