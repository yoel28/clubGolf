import {Component, OnInit, AfterViewInit, NgModule} from '@angular/core';
import {BaseViewComponent} from "../../com.zippyttech.ui/view/base/baseView.component";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {RuleModel} from "./rule.model";

declare var SystemJS:any;
@NgModule({
    imports:[BaseViewComponent]
})
@Component({
    selector: 'rule',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class RuleComponent implements OnInit,AfterViewInit{

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
        this.model= new RuleModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Reglas';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la regla: ',
            'keyAction':'name'
        };
    }
}