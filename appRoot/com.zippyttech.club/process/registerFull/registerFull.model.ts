import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {VehicleModel} from "../../catalog/vehicle/vehicle.model";
import {TagModel} from "../../catalog/tag/tag.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions, ModelRoot} from "../../../com.zippyttech.common/modelRoot";


export class RegisterFullModel extends ModelBase{

    public user:any;
    public vehicle:any;
    public tags:any;


    constructor(public db:DependenciesBase){
        super(db,'/users/wizard');
        this.initModel();
    }
    modelExternal() {
        this.user = new UserModel(this.db);
        this.user.rules = (<ModelRoot>this.user).getIncludeKeys(['email','username','name']);
        this.vehicle = new VehicleModel(this.db,false);
        this.tags = new TagModel(this.db);
    }
    initRules() {

        this.rules['user'] =  this.user.ruleObject;
        this.rules['user'].update= this.permissions.update;

        this.rules['vehicle'] =  this.vehicle.ruleObject;
        this.rules['vehicle'].update= this.permissions.update;

        delete this.rules['vehicle'].rulesSave['user'];
        delete this.rules['vehicle'].rulesSave['year'];
        delete this.rules['vehicle'].rulesSave['color'];
        delete this.rules['vehicle'].rulesSave['model'];
        delete this.rules['vehicle'].rulesSave['vehicleType'];
        delete this.rules['vehicle'].rulesSave['detail'];


        this.rules['tags'] =  this.tags.ruleObject;
        this.rules['tags'].update= this.permissions.update;
    }
    initPermissions() {}
    initParamsSearch() {}
    initParamsSave() {}
    initRuleObject() {}
    initRulesSave() {
        this.rulesSave = Object.assign({});
    }

    initModelActions(params: IModelActions) {}


}

