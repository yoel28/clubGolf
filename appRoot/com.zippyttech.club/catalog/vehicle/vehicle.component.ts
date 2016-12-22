import {Component} from '@angular/core';
import {VehicleModel} from "./vehicle.model";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {TagModel} from "../tag/tag.model";

declare var SystemJS:any;
@Component({
    selector: 'vehicle',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class VehicleComponent extends BaseViewInstance{

    public tag:any;
    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new VehicleModel(this.myglobal);
        this.tag= new TagModel(this.myglobal);

        this.model.rules['tags']=this.tag.ruleObject;
        this.model.rules['tags'].multiple=true;
        this.model.rules['tags'].paramsSearch.where="&where="+encodeURI("[['or':[['op':'isNull','field':'vehicle.id'],['op':'eq','field':'vehicle.id','value':data.id]]]]");
        this.model.rules['tags'].paramsSearch.eval='this.model.rules[key].paramsSearch.where = this.model.rules[key].paramsSearch.where.replace("data.id",data.id)';

        //this.model.rules['tags'].required = true;
        this.model.rules['tags'].reference = true;
        this.model.rules['tags'].pathLocal=true;
        this.model.rules['tags'].model = this.tag;


        this.model.rules['tags'].callback = (value,dataSelect)=>{
            if(value.vehicleId == dataSelect.id){
                dataSelect.tags.push(value);
            }
        }
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Vehículos';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el vehículo con la placa : ',
            'keyAction':'plate'
        };
    }
}