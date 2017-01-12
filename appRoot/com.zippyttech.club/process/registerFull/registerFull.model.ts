import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {VehicleModel} from "../../catalog/vehicle/vehicle.model";
import {TagModel} from "../../catalog/tag/tag.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";


export class RegisterFullModel extends ModelBase{

    public user:any;
    public vehicle:any;
    public tags:any;


    constructor(public db:DependenciesBase){
        super(db,'REG_FULL','/users/wizard');
        this.initModel();
    }
    modelExternal() {
        this.user = new UserModel(this.db);
        this.vehicle = new VehicleModel(this.db,false);
        this.tags = new TagModel(this.db);
    }
    initRules() {
        this.rules['user'] =  this.user.ruleObject;
        this.rules['vehicle'] =  this.vehicle.ruleObject;
        delete this.rules['vehicle'].rulesSave['user'];
        delete this.rules['vehicle'].rulesSave['year'];
        delete this.rules['vehicle'].rulesSave['color'];
        delete this.rules['vehicle'].rulesSave['model'];
        delete this.rules['vehicle'].rulesSave['vehicleType'];
        delete this.rules['vehicle'].rulesSave['detail'];


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

