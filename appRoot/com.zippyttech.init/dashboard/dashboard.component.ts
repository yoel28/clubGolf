import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ControllerBase} from "../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../com.zippyttech.club/catalog/record/record.model";
import {TradeModel} from "../../com.zippyttech.club/catalog/trade/trade.model";

declare var SystemJS:any;

@Component({
    selector: 'dashboard',
    templateUrl: SystemJS.map.app+'com.zippyttech.init/dashboard/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.init/dashboard/style.css']
})
export class DashboardComponent extends ControllerBase implements OnInit{
    private record:RecordModel;
    private trade:TradeModel;

    constructor(public myglobal:globalService,public http:Http,public db:DependenciesBase) {
        super(db,'NOPREFIX','/dashboard/');
        this.initModel();
    }

    ngOnInit():void {

    }

    initModel(){
        let visibles:String[] = ["dateIn","userName","vehicle","userType"];

    }

}


