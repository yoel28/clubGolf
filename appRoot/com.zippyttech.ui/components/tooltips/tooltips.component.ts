import {Component, OnInit,HostListener} from '@angular/core';
import {InfoModel} from "../../../com.zippyttech.business/info/info.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";


declare var SystemJS:any;
var moment = require('moment');
var jQuery = require('jquery');

@Component({
    selector: 'tooltip-view',
    templateUrl: SystemJS.map.app+'/com.zippyttech.ui/components/tooltips/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.ui/components/tooltips/style.css'],
    inputs: ['code'],
})
export class TooltipComponent implements OnInit{

    public permissions:any;
    public code="";
    public data:any={};
    public info:any;
    

    public configId=moment().valueOf();

    constructor(public db:DependenciesBase) {
        this.info=new InfoModel(db);
        this.permissions = Object.assign({},this.info.permissions);
    }
    ngOnInit() {
        // this.configId='TOOLTIP_'+this.configId+'_'+this.code;
        // if(this.code && this.code.length>0){
        //     this.data=this.db.myglobal.getTooltip(this.code);
        // }
    }
    ngAfterViewInit()
    {
        // let that=this;
        // if(this.data && this.data.id){
        //     jQuery('#'+this.configId).popover({
        //         trigger: "manual"
        //     });
        // }
    }
    edit(event,data){
        // event.preventDefault();
        // if(this.permissions.update){
        //     if(this.db.myglobal.objectInstance[this.info.prefix]){
        //         this.db.myglobal.objectInstance[this.info.prefix].setLoadDataModel(data,true);
        //     }
        // }
    }
}
