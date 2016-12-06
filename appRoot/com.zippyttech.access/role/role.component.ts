import {Component, OnInit, AfterViewInit} from '@angular/core';
import {RoleModel} from "./role.model";
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'role',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class RoleComponent implements OnInit,AfterViewInit{

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

    initModel():any {
        this.model= new RoleModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Roles';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el rol : ',
            'keyAction':'authority'
        };
    }
}