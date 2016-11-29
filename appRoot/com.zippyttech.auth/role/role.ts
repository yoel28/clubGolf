import {Component, OnInit,AfterViewInit} from '@angular/core';
import {MRole} from "./mRole";
import {BaseView} from "../../com.zippyttech.ui/view/base/baseView";
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'role',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
    directives: [BaseView],
})
export class Role implements OnInit,AfterViewInit{

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
        this.model= new MRole(this.myglobal);
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