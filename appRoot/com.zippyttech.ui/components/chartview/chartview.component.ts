import {Component, NgModule} from "@angular/core";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

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
    public year:number;
    public month:number;
    public chartInstance:Highcharts.ChartObject;

    constructor(public db:DependenciesBase){
        super(db);
        this.year = (new Date).getFullYear();
        this.month = -1;
    }

    initModel() {
        this.chartId = "CHART_"+moment().valueOf();
        this.chartData.options["chart"].renderTo = this.chartId;
        this.chartData.options["credits"] = false;
        this.chartRefresh();
    }

    public onPointSelect(event)
    {
        if(this.month < 0) {
            this.month = event.context.x + 1;
            this.chartRefresh();
        }
    }

    public change(dir:number){
        if(this.month < 0)
            this.year += dir;
        else
            this.month += dir;
        this.chartRefresh();
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
            console.log(''+this.year+"/"+this.month);
            if(this.chartInstance) {
                this.chartInstance = new Highcharts.chart(this.chartData.options);
            }
        };
        this.httputils.doGet(this.chartData.endpoint+this.year+'/'+((this.month<0)?"":this.month),callback,null,false);
    }

    public getTitle():string{
        let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        if(this.month < 0)
            return ''+this.year;
        return months[this.month-1];
    }

}