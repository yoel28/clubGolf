import {Component} from '@angular/core';
import {VehicleModel} from "./vehicle.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {TagModel} from "../tag/tag.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {UserTypeModel} from "../userType/userType.model";

declare var SystemJS:any;
@Component({
    selector: 'vehicle',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
    inputs:['rest']
})
export class VehicleComponent extends BaseViewInstance{

    private tag:any;
    private userType:any;

    constructor(public db:DependenciesBase) {
        super();
    }

    initModel() {
        this.model= new VehicleModel(this.db);
        this.tag= new TagModel(this.db);
        this.userType = new UserTypeModel(this.db);

        this.model.rules['tags']=this.tag.ruleObject;
        this.model.rules['tags'].search=false;
        this.model.rules['tags'].multiple=true;
        this.model.rules['tags'].update = this.model.permissions.update;
        this.model.rules['tags'].paramsSearch.where=[{'or':[{'op':'isNull','field':'vehicle.id'},{'op':'eq','field':'vehicle.id','value':null}]}];
        this.model.rules['tags'].paramsSearch.eval='this.model.rules[key].paramsSearch.where[0].or[1].value = data.id';

        //this.model.rules['tags'].required = true;
        this.model.rules['tags'].reference = true;
        this.model.rules['tags'].pathLocal=true;
        this.model.rules['tags'].model = this.tag;

        this.model.rules['userType']=this.userType.ruleObject;
        this.model.rules['userType'].search=this.model.permissions.search;

        this.model.rules['tags'].callback = (value,dataSelect)=>{
            if(value.vehicleId == dataSelect.id){
                dataSelect.tags.push(value);
            }
        };
    }
    initViewOptions(params){
        params["title"] = 'Vehículos';
    }

}