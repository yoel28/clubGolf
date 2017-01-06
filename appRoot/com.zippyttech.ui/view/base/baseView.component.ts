import {Component, OnInit, HostBinding, trigger, state, style, transition, animate} from '@angular/core';
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {AnimationsManager} from "../../animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";


declare var SystemJS:any;
@Component({
    selector: 'base-view',
    templateUrl: SystemJS.map.app + '/com.zippyttech.ui/view/base/index.html',
    styleUrls: [SystemJS.map.app + '/com.zippyttech.ui/view/base/style.css'],
    inputs: ['instance'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class BaseViewComponent extends ControllerBase implements OnInit {
    public instance:any;

    public dataSelect:any = {};
    public paramsTable:any={};

    constructor(public db:DependenciesBase) {
        super('NOPREFIX','/NOENDPOINT/',db);
    }
    ngOnInit(){
        super.ngOnInit();
        this.initParams();
        this.initRest();
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
    initRest(){
        this.setWhere(this.instance.rest.where);//TODO:Falta cargar todos las demas variables y hacer parametros dinamicos
    }
    initViewOptions() {
        this.viewOptions["title"] = this.instance.viewOptions.title;
        this.viewOptions["buttons"] = [];
        
        this.viewOptions["buttons"].push({
            'visible': this.model.permissions.add,
            'title': 'Agregar',
            'class': 'text-green',
            'icon': 'fa fa-plus',
            'modal': this.model.paramsSave.idModal
        });
        this.viewOptions["buttons"].push({
            'visible': this.model.permissions.filter && this.model.permissions.list,
            'title': 'Filtrar',
            'class': 'text-blue',
            'icon': 'fa fa-filter',
            'modal': this.model.paramsSearch.idModal
        });
    }
    loadParamsTable(){
        this.paramsTable.endpoint=this.endpoint;
        this.paramsTable.actions={};

        if(this.instance.paramsTable && this.instance.paramsTable.actions )
        {
            if(this.instance.paramsTable.actions.delete){
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

            if(this.instance.paramsTable.actions.viewHistory){
                this.paramsTable.actions.viewHistory = this.instance.paramsTable.actions.viewHistory;
            }

        }
        
    }

    setVisibleField(event,data)
    {
        if(event){
            event.preventDefault();
            event.stopPropagation();
        }
        data.visible = ! data.visible;
    }
    setCheckField(event,data){
        if(event){
            event.preventDefault();
            event.stopPropagation();
        }
        data.check = !data.check;
    }


}

