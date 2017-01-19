import {Component, OnInit, DoCheck} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ControllerBase} from "../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {IListActionData, ListActionComponent} from "../../com.zippyttech.ui/components/listAction/listAction.component";
import {GetbackModel} from "../../com.zippyttech.club/process/getBack/getback.model";
import {DashboardModel} from "./dashboard.model";
import {FormControl} from "@angular/forms";

/*
const Highcharts = require('highcharts');
const Highcharts3d = require('highcharts/highcharts-3d.src');
Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B']
});*/

declare var SystemJS:any;
declare var jQuery:any;

@Component({
    selector: 'dashboard',
    templateUrl: SystemJS.map.app+'com.zippyttech.init/dashboard/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.init/dashboard/style.css']
})
export class DashboardComponent extends ControllerBase implements OnInit, DoCheck{
    private recordData:IListActionData;
    private tradeData:IListActionData;
    private guestData:IListActionData;

    public guestRemove:FormControl = new FormControl();
    public qrString:string = '';
    public qrHidden: boolean;

    public chart1options:Highcharts.Options;

    constructor(public myglobal:globalService,public http:Http,public db:DependenciesBase) {
        super(db,'DASH','/dashboard/');
        this.initCharts();
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
            visibleKeys:["sponsor","product","dateCreated","guest"],
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
            visibleKeys:["sponsorName","sponsor","guest","timeLimit"],
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
            let where = [];
            if (data.sponsorContract)
                where=[{join:"sponsor", where:[{'op':'eq','field':'contractCode','value':data.sponsorContract}]}];
            else
                where=[{join:"sponsor", where:[{'op':'isNull','field':'contractCode'}]}];
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
        this.model.qr.dataList = {};
    }

    private observableAction(context:ListActionComponent)
    {

        if(context.data.observable.watch.value)
            context.data.model.spliceId(context.data.observable.watch.value);
    }



    ngDoCheck() {
        if(jQuery('#reader').hasClass('reader-hide'))
            this.qrHidden = true;

        if(!(this.model.qr && this.model.qr.dataList && this.model.qr.dataList.id)) {
            jQuery('#reader').find('.box-body,.box-footer').collapse('hide');
            jQuery('#reader').find('.box').addClass('collapsed-box');
        }
        else{
            jQuery('#reader').find('.box').removeClass('collapsed-box');
            jQuery('#reader').find('.box-body,.box-footer').collapse('show');
        }
    }

    private readerClick(){
        let reader = jQuery('#reader');
        if(reader.hasClass('reader-hide')) {
            reader.removeClass('reader-hide');
            this.qrHidden = false;
        }
        else {
            reader.addClass('reader-hide');
            this.qrHidden = true;
        }
    }

    public initCharts()
    {
        let that = this;
        let callback = (response)=>{
            that.loadChart(response.json());
        };
        this.httputils.doGet('/reports/entries/2017/',callback,null,false);
    }

    public loadChart(JSONrespose)
    {

        let data:any = {};

        Object.assign(data, JSONrespose);

        this.chart1options = {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'ENTRADAS'
            },
            xAxis: {
                categories: data.categories,
                tickmarkPlacement: 'on'
            },
            yAxis: {
                title: { text: 'N° de entradas' },
            },
            tooltip: {
                valueSuffix: ' entradas'
            },
            plotOptions: {
                series: {
                    shadow: true
                },
                line:{}
            },
            series: data.list,
            credits:false
        };
    }
}


