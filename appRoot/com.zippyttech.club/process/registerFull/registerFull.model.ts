import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {VehicleModel} from "../../catalog/vehicle/vehicle.model";
import {TagModel} from "../../catalog/tag/tag.model";


export class RegisterFullModel extends ModelBase{

    public user:any;
    public vehicle:any;
    public tags:any;


    constructor(public myglobal:globalService){
        super('REG_FULL','/users/wizard',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.user = new UserModel(this.myglobal);
        this.vehicle = new VehicleModel(this.myglobal);
        this.tags = new TagModel(this.myglobal);
    }
    initRules() {
        this.rules['user'] =  this.user.ruleObject;
        this.rules['vehicle'] =  this.vehicle.ruleObject;
        this.rules['tags'] =  this.tags.ruleObject;
    }
    initPermissions() {}
    initParamsSearch() {}
    initParamsSave() {}
    initRuleObject() {}
    initRulesSave() {
        this.rulesSave = Object.assign({});
    }

}

