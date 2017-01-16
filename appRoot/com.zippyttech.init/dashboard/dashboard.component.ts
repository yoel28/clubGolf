import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ControllerBase} from "../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../com.zippyttech.club/catalog/record/record.model";
import {TradeModel} from "../../com.zippyttech.club/catalog/trade/trade.model";
import {IListActionData, ListActionComponent} from "../../com.zippyttech.ui/components/listAction/listAction.component";
import {GetbackModel} from "../../com.zippyttech.club/process/getBack/getback.model";

declare var SystemJS:any;
@Component({
    selector: 'dashboard',
    templateUrl: SystemJS.map.app+'com.zippyttech.init/dashboard/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.init/dashboard/style.css']
})
export class DashboardComponent extends ControllerBase implements OnInit{
    private record:RecordModel;
    private trade:TradeModel;
    private recordData:IListActionData;
    private tradeData:IListActionData;

    constructor(public myglobal:globalService,public http:Http,public db:DependenciesBase) {
        super(db,'NOPREFIX','/dashboard/');

    }

    ngOnInit():void {
        super.ngOnInit();
        this.initActions();
    }

    initModel(){
        this.record = new RecordModel(this.db);
        this.trade = new TradeModel(this.db);
        this.record.ruleObject.title = "Vehiculos en el estacionamiento";
        this.trade.ruleObject.title = "Operaciones pendientes";
        this.record.loadDataWhere('',[{'op':'isNull','field':'dateOut'}]);
        this.trade.loadDataWhere('',[{'op':'isNull','field':'receivedDate'}]);

        let that=this;
        Object.keys(this.record.rules).forEach((key)=>{
            if(key != "dateIn" && key != "user" && key != "vehicle" && key != "userType")
                that.record.rules[key].visible = false;
            if(that.record.rules[key].type =='date')
                that.record.rules[key].title = "fecha";
        });

        Object.keys(this.trade.rules).forEach((key)=>{
            if(key != "dateCreated" && key != "product" && key != "sponsor" && key != "guest")
                that.trade.rules[key].visible = false;
            if(that.trade.rules[key].type =='date')
                that.trade.rules[key].title = "fecha";
        });
    }

    private initActions() {
        //Productos
        let that = this;
        this.tradeData = {
            routerLink:"/club/process/getback",
            model: that.trade,
            actions:{
                "put":{
                    model: new GetbackModel(this.db),
                    action : that.outAction,
                    title: "Generar entrada"
                }
            },
            globalParams:{
                "byClient": {
                    required: true,
                },
                "state": {
                    required: true,
                },
                "detail": {
                    required: false,
                }
            }
        }

        this.recordData = {
            routerLink:"/club/catalog/record",
            model: that.record,
            actions:undefined,
            globalParams:undefined
        }

    }

    private outAction(context:ListActionComponent){
        if(context.dataSelect && context.dataSelect.productCode){
            context.dataForm["state"] = parseInt(context.dataForm["state"]);
            let body={'list':[
                    Object.assign({},{'code': context.dataSelect.productCode},context.dataForm)
                ]};
            context.data.actions['put'].model.onSave(body).then(
                response=>{
                    context.data.model.dataList.list.splice(context.data.model.dataList.list.indexOf(context.dataSelect),1);
                    console.log('guAARDO');
                }
            );
        }
    }
}


