import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {EventModel} from "./event.model";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;

@Component({
    selector: 'event',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class EventComponent extends BaseViewInstance{

    constructor(public myglobal:globalService,public http:Http) {
        super();
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

