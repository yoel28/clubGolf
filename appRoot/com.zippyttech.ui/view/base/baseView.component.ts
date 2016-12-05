import {Component, OnInit, NgModule} from '@angular/core';
import {Router}           from '@angular/router';
import {Http} from '@angular/http';
import {FilterComponent} from "../../components/filter/filter.component";
import {TablesComponent} from "../../components/tables/tables.component";
import {SaveComponent} from "../../components/save/save.component";
import {TooltipComponent} from "../../components/tooltips/tooltips.component";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@Component({
    selector: 'base-view',
    templateUrl: SystemJS.map.app+'/com.zippyttech.ui/view/base/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
    inputs:['instance'],
})
export class BaseViewComponent extends ControllerBase implements OnInit {

    public instance:any;

    public dataSelect:any = {};
    public paramsTable:any={};

    constructor(public router:Router, public http:Http, public myglobal:globalService) {
        super('NOPREFIX','/NOENDPOINT/',router, http, myglobal);
    }
    ngOnInit(){
        this.initModel();
        this.initParams();
        this.initViewOptions();
        this.loadParamsTable();
        this.loadPage();
    }
    initModel() {
        this.model = this.instance.model;
    }
    initParams(){
        this.prefix = this.model.prefix;
        this.setEndpoint(this.model.endpoint);
    }
    initViewOptions() {
        this.viewOptions["title"] = this.instance.viewOptions.title;
        this.viewOptions["buttons"] = [];
        
        this.viewOptions["buttons"].push({
            'visible': this.model.permissions.add,
            'title': 'Agregar',
            'class': 'btn btn-green',
            'icon': 'fa fa-save',
            'modal': this.model.paramsSave.idModal
        });
        this.viewOptions["buttons"].push({
            'visible': this.model.permissions.filter && this.model.permissions.list,
            'title': 'Filtrar',
            'class': 'btn btn-blue',
            'icon': 'fa fa-filter',
            'modal': this.model.paramsSearch.idModal
        });
    }
    loadParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};

        if(this.instance.paramsTable && this.instance.paramsTable.actions && this.instance.paramsTable.actions.delete )
        {
            this.paramsTable.actions.delete = {
                "icon": "fa fa-trash",
                "exp": "",
                'title': 'Eliminar',
                'idModal': this.prefix+'_'+this.configId+'_DEL',
                'permission': this.model.permissions.delete,
                'message': this.instance.paramsTable.actions.delete.message,
                'keyAction':this.instance.paramsTable.actions.delete.keyAction
            };
        }
        
    }


}

