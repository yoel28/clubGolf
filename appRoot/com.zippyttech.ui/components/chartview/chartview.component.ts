import {Component, NgModule} from "@angular/core";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {checkBinding} from "@angular/core/src/linker/view_utils";

const Highcharts = require('highcharts');/*
 const Highcharts3d = require('highcharts/highcharts-3d.src');
 Highcharts.setOptions({
 colors: ['#058DC7', '#50B432', '#ED561B']
 });*/

declare var SystemJS:any;
declare var moment:any;
declare var jQuery:any;

export interface IChartData
{
    endpoint:string;
    title:string;
    options:{};
}
/*
@NgModule({
    imports:[XEditable,ColorPicker,SearchComponent,SaveComponent]
})*/
@Component({
    moduleId: module.id,
    selector: 'chart-view',
    templateUrl: 'template.html',
    styleUrls: ['style.css'],
    inputs:['chartData']
})
export class ChartViewComponent extends ControllerBase
{

    public chartData:IChartData;
    public chartId:string;
    public selectDate:Date;
    public currentDate:Date;
    public chartInstance:Highcharts.ChartObject;
    public viewDeep:number;

    constructor(public db:DependenciesBase){
        super(db);
        this.currentDate = new Date();
        this.selectDate = new Date();
        this.viewDeep = 0;
    }

    initModel() {
        this.chartId = "CHART_"+moment().valueOf();
        this.chartData.options["chart"].renderTo = this.chartId;
        this.chartData.options["credits"] = false;
        this.chartRefresh();
    }

    public onPointSelect(event)
    {
        if(this.viewDeep == 0 && this.currentDate.getMonth() >= event.context.x) {
            this.rest.findData = true;
            this.selectDate.setMonth(event.context.x);
            this.viewDeep++;
            this.chartRefresh();
        }
    }

    private checkChange(dir:number):boolean{
        if(dir==1 && ((this.selectDate.getFullYear() < this.currentDate.getFullYear())?true:(this.selectDate.getMonth()<this.currentDate.getMonth())))
            return true;
        if(dir==-1 && (this.viewDeep==0)?true:(this.selectDate.getMonth() > 0))
            return true;
    }

    public changeD(dir:number){
        if(this.checkChange(dir))
        {
            if(this.viewDeep == 0){
                this.selectDate.setFullYear(this.selectDate.getFullYear()+dir);
            }else if(this.viewDeep == 1) {
                this.selectDate.setMonth(this.selectDate.getMonth()+dir);
            }
            this.chartRefresh();
        }
    }

    public saveInstance(instance)
    {
        this.chartInstance = instance;
    }

    public chartRefresh(){
        let that = this;
        let callback = (response)=>{
            let data:any = {};
            let that = this;
            Object.assign(data,response.json());
            for(let ob of data.list) {
                let newData = {
                    name: ob["name"],
                    data: ob["data"],
                    allowPointSelect: true
                };
                Object.assign(ob, newData);
            }
            this.chartData.options["title"] = {
                                                text: this.getTitle()
                                            },
            this.chartData.options["xAxis"].categories = data.categories;
            this.chartData.options["series"] = data.list;

            console.log(this.chartData.options);

            this.rest.findData = false;
        };
        this.rest.findData = true;
        this.httputils.doGet(this.chartData.endpoint+this.selectDate.getFullYear()+'/'+((this.viewDeep==0)?"":(this.selectDate.getMonth()+1)),callback,null,false);
    }

    public getTitle():string{
        let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        if(this.viewDeep == 0)
            return ''+this.selectDate.getFullYear();
        return months[this.selectDate.getMonth()];
    }

}