import {Component, OnInit, DoCheck, AfterContentInit, AfterViewInit} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {ControllerBase} from "../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {IListActionData, ListActionComponent} from "../../com.zippyttech.ui/components/listAction/listAction.component";
import {GetbackModel} from "../../com.zippyttech.club/process/getBack/getback.model";
import {DashboardModel} from "./dashboard.model";
import {FormControl} from "@angular/forms";
import {IChartData} from "../../com.zippyttech.ui/components/chartview/chartview.component";



declare var SystemJS:any;
declare var jQuery:any;

@Component({
    selector: 'dashboard',
    templateUrl: SystemJS.map.app+'com.zippyttech.init/dashboard/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.init/dashboard/style.css']
})
export class DashboardComponent extends ControllerBase implements OnInit, AfterViewInit{
    private recordData:IListActionData;
    private tradeData:IListActionData;
    private guestData:IListActionData;

    public guestRemove:FormControl = new FormControl();

    public chvwEntries:IChartData;
    public chvwProducts:IChartData;
    public chvwVehicles:IChartData;
    public chvwTypes:IChartData;

    constructor(public myglobal:globalService,public http:Http,public db:DependenciesBase) {
        super(db);
    }

    ngOnInit():void {
        super.ngOnInit();
        this.initActions();
        this.initChartView();
    }

    initModel(){
        this.model = new DashboardModel(this.db);
    }

    //LIST-ACTION GROUP
    private initActions() {
        //Productos
        let modelAction = new GetbackModel(this.db);
        let that = this;
        this.tradeData = {
            routerLink:"/club/process/getback",
            model: that.model['trade'],
            visibleKeys:["sponsor","product","dateCreated"],
            actions:{
                    "put":{
                        model: modelAction,
                        action : that.outAction,
                        title: "Generar entrada",
                        permission: that.model['trade'].permissions.getback
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
            model: that.model['record']
        }

        this.guestData = {
            visibleKeys:["sponsor","guest","timeLimit",'dateCreated'],
            routerLink:"/club/catalog/qr",
            model: that.model['guest'],
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
                }
            );
        }
    }

    //CHART-VIEW
    public initChartView(){

        this.chvwEntries ={
            title: "Entradas",
            endpoint: "/reports/entries/",
            options:{
                chart: {
                    type: 'areaspline'
                },
                xAxis: {
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: { text: 'N° de entradas' },
                },
                tooltip: {
                    valueSuffix: ' entradas',
                    split:true,
                    crosshairs: true
                },
                plotOptions: {
                    areaspline:
                    {
                        fillOpacity: 0.5
                    }
                }
            }
        }

        this.chvwProducts ={
            title: "Productos",
            endpoint: "/reports/products/",
            options:{
                chart: {
                    type: 'column'
                },
                xAxis: {
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: { text: 'N° de entradas' },
                },
                tooltip: {
                    valueSuffix: ' entradas',
                    split:true,
                    crosshairs: true
                }
            }
        }

        this.chvwVehicles ={
            title: "Vehiculos",
            endpoint: "/reports/vehicles/",
            options:{
                chart: {
                    type: 'line'
                },
                xAxis: {
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: { text: 'N° de entradas' },
                },
                tooltip: {
                    valueSuffix: ' entradas',
                    split:true,
                    crosshairs: true
                }
            }
        }

        this.chvwTypes = {
            title: "Vehiculos por tipos de usuario",
            endpoint: "/reports/types/",
            options:{
                chart: {
                    type: 'line'
                },
                xAxis: {
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    title: { text: 'N° de entradas' },
                },
                tooltip: {
                    valueSuffix: ' entradas',
                    split:true,
                    crosshairs: true
                }
            }
        }
    }

    private observableAction(context:ListActionComponent){
        if(context.data.observable.watch.value)
            context.data.model.spliceId(context.data.observable.watch.value);
    }

    ngAfterViewInit(){
        if(this.db.qrReader)
            this.db.qrReader.open(null);
    }
    //https://codepen.io/riveram/pen/BWeJBy
}


