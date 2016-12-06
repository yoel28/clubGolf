import { Component,EventEmitter } from '@angular/core';
import { Http} from '@angular/http';
import {RestController} from "../../../com.zippyttech.rest/restController";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
declare var SystemJS:any;
@Component({
    selector: 'search-multiple-view',
    templateUrl: SystemJS.map.app+'/com.zippyttech.ui/components/searchMultiple/index.html',
    styleUrls: [ SystemJS.map.app+'/com.zippyttech.ui/components/searchMultiple/style.css'],
    inputs:['params'],
    outputs:['result'],
})
export class SearchMultipleComponent extends RestController{

    public params:any={};
    public result:any;

    public msg = StaticValues.msg;

    constructor(public http:Http) {
        super(http);
        this.result = new EventEmitter();
    }
    ngOnInit(){
        this.max = 5;
        this.setEndpoint(this.params.endpoint);
    }
    getSearch(search){
        this.endpoint=this.params.endpoint+search;
        this.where = this.params.where || "";
        this.loadData();
    }
    getData(event){
        if(event)
            event.preventDefault();
        this.result.emit(this.params.valuesData);
    }
    addValue(event,id){
        if(event)
            event.preventDefault();
        this.params.valuesData.push(id);
    }
    deleteValue(event,id){
        if(event)
            event.preventDefault();
        let index = this.params.valuesData.indexOf(id);
        if(index>-1)
            this.params.valuesData.splice(index,1);
    }
    existValue(id){
        return this.params.valuesData.indexOf(id)>-1?true:false;
    }
}

