import {Component, NgModule} from "@angular/core";
import {SearchComponent} from "../search/search.component";
import {SaveComponent} from "../save/save.component";
import {XEditable} from "../../../com.zippyttech.utils/directive/xEditable";
import {ColorPicker} from "../../../com.zippyttech.utils/directive/colorPicker";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
declare var moment:any;

export interface IChartData
{
    endpoint:string;
    options:Highcharts.Options;
}
/*
@NgModule({
    imports:[XEditable,ColorPicker,SearchComponent,SaveComponent]
})*/
@Component({
    selector: 'chart-view',
    templateUrl: SystemJS.map.app+'/com.zippyttech.ui/components/accordion/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.ui/components/accordion/style.css'],
    inputs:['chartData']
})
export class ChartComponent extends ControllerBase
{

    public chartData:IChartData;

    constructor(public db:DependenciesBase){
        super(db);
        let that = this;
        let callback = (response)=>{
            that.loadChart(response.json());
        };
        this.httputils.doGet(this.chartData.endpoint+((new Date).getFullYear()),callback,null,false);
    }

    public loadChart(JSONrespose)
    {

        let data:{list:[{}],categories:string[]};

        Object.assign(data, JSONrespose);

        this.chartData.options.xAxis["categories"] = data.categories;
        this.chartData.options.series = data.list;
        this.chartData.options.credits = false;
    }


    initModel() {
    }


}