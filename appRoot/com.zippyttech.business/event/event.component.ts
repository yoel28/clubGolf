import {Component, OnInit, AfterViewInit, NgModule} from '@angular/core';
import {Http} from '@angular/http';
import {EventModel} from "./event.model";
import {BaseViewComponent} from "../../com.zippyttech.ui/view/base/baseView.component";
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;
@NgModule({
    imports: [BaseViewComponent],
})
@Component({
    selector: 'event',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class EventComponent implements OnInit,AfterViewInit{

    public instance:any={};
    public paramsTable:any={};
    public model:any;
    public viewOptions:any={};

    constructor(public myglobal:globalService,public http:Http) {}

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
        this.model= new EventModel(this.myglobal,this.http);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Eventos';
    }
    loadParamsTable(){
       this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el evento : ',
            'keyAction':'code'
        };
    }

}

