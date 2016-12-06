import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserModel} from "./user.model";
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'user',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class UserComponent implements OnInit,AfterViewInit{

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
        this.model= new UserModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Usuarios';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el usuario : ',
            'keyAction':'username'
        };
    }
}