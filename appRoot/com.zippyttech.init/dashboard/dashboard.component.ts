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
    private record:any;
    private trade:any;

    constructor(public myglobal:globalService,public http:Http,public db:DependenciesBase) {
        super(db,'NOPREFIX','/dashboard/');
    }

    ngOnInit():void {
        super.ngOnInit();
    }

    initModel(){
        this.record = new RecordModel(this.db.myglobal);
        this.trade = new TradeModel(this.db.myglobal);
        this.record.title = "Vehiculos";
        this.trade.title = "Pendientes por entregar";
        let _whereRecord=[ {'op':'isNull','field':'dateOut'} ];
        let _whereTrade=[ {'op':'isNull','field':'receivedDate'} ];

        let that=this;
        this.record.loadDataModelWhere(
            (response)=>{ Object.assign(that.record.dataList ,response.json()) }
            ,_whereRecord);

        this.trade.loadDataModelWhere(
            (response)=>{ Object.assign(that.trade.dataList ,response.json()) }
            ,_whereTrade);

        console.log(this.record.dataList);
        console.log(this.trade.dataList);

        Object.keys(this.record.rules).forEach((key)=>{
            if(key != "dateIn" && key != "userName" && key != "vehicle" && key != "userType")
                that.record.rules[key].visible = false;
        });

        Object.keys(this.trade.rules).forEach((key)=>{
            if(key != "dateCreated" && key != "product" && key != "sponsor" && key != "guest")
                that.trade.rules[key].visible = false;
        });
    }

}


