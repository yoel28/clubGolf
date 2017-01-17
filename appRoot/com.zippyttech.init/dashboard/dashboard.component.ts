import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ControllerBase} from "../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../com.zippyttech.club/catalog/record/record.model";
import {TradeModel} from "../../com.zippyttech.club/catalog/trade/trade.model";
import {IListActionData, ListActionComponent} from "../../com.zippyttech.ui/components/listAction/listAction.component";
import {GetbackModel} from "../../com.zippyttech.club/process/getBack/getback.model";
import {DashboardModel} from "./dashboard.model";
import {FormControl} from "@angular/forms";

declare var SystemJS:any;
declare var jQuery:any;

@Component({
    selector: 'dashboard',
    templateUrl: SystemJS.map.app+'com.zippyttech.init/dashboard/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.init/dashboard/style.css']
})
export class DashboardComponent extends ControllerBase implements OnInit{
    private recordData:IListActionData;
    private tradeData:IListActionData;
    private guestData:IListActionData;

    constructor(public myglobal:globalService,public http:Http,public db:DependenciesBase) {
        super(db,'DASH','/dashboard/');

    }

    ngOnInit():void {
        super.ngOnInit();
        this.initActions();
    }

    initModel(){
        this.model = new DashboardModel(this.db);
    }

    private initActions() {
        //Productos
        let modelAction = new GetbackModel(this.db);
        let that = this;
        this.tradeData = {
            routerLink:"/club/process/getback",
            model: that.model.trade,
            actions:{
                "put":{
                    model: modelAction,
                    action : that.outAction,
                    title: "Generar entrada",
                    permission: modelAction.permissions.add
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
            model: that.model.record,
            actions:undefined,
            globalParams:undefined
        }

        this.guestData = {
            routerLink:"/club/catalog/qr",
            model: that.model.guest,
            actions:undefined,
            globalParams:undefined,
            observable:{
                watch:that.guestRemove,
                _function:that.observableAction
            }
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


    public guestRemove:FormControl = new FormControl();
    public qrString:string = '';
    searchQr(event){
        if(event)
            event.preventDefault();
        try {
            let that=this;
            let val = jQuery('#validQr').val();
            val = val.replace(/'/g, '"');
            this.qrString = val;
            jQuery('#validQr').val('');
            let data = JSON.parse(val);
            let where=[{join:"sponsor", where:[{'op':'eq','field':'contractCode','value':data.sponsorContract}]}];

            this.model.qr.loadDataWhere(data.id,where);

        }catch (e){
            this.addToast('Error','QR invalido','error');
        }
    }



    public loadAttendings(event)
    {
        let that = this;
        let callback = (response)=>{
            that.guestRemove.setValue(this.model.qr.dataList.id);
        };

        if(event)
            event.preventDefault();

        this.httputils.doPost('/attendings/',this.qrString,callback,this.error);
    }

    private observableAction(context:ListActionComponent)
    {
        if(context.data.observable.watch.value)
            context.data.model.spliceId(context.data.observable.watch.value);
    }

}


