import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {VehicleModel} from "../../catalog/vehicle/vehicle.model";
import {TagModel} from "../../catalog/tag/tag.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {ContractModel} from "../../catalog/contract/contract.model";


export interface registerData{
    user:{};
    vehicle:[{}];
    contract:{};
}

export class RegisterPartialModel extends ModelBase
{
    public contract:ContractModel;
    public vehicle:VehicleModel;
    public tags:TagModel;
    public user:UserModel;

    constructor(public db:DependenciesBase){
        super(db,'REG_PARTIAL','/users/wizard');
        this.initModel();
    }

    initPermissions(){

    }

    modelExternal(){
        this.contract = new ContractModel(this.db)
        this.vehicle = new VehicleModel(this.db,false);
        this.tags = new TagModel(this.db);
        this.user = new UserModel(this.db);
    }

    initRules(){

        this.rules['user'] = {}
        this.rules['user'].id = (new UserModel(this.db)).ruleObject;
        this.rules['user'].id.key='id';

        delete this.user.ruleObject.rulesSave['contract'];
        delete this.user.ruleObject.rulesSave['userGroup'];
        delete this.user.ruleObject.rulesSave['userStatus'];
        delete this.user.ruleObject.rulesSave['userType'];

        delete this.vehicle.ruleObject.rulesSave['user'];
        delete this.vehicle.ruleObject.rulesSave['year'];
        delete this.vehicle.ruleObject.rulesSave['color'];
        delete this.vehicle.ruleObject.rulesSave['model'];
        delete this.vehicle.ruleObject.rulesSave['vehicleType'];
        delete this.vehicle.ruleObject.rulesSave['detail'];

        this.rules['tags'] =  this.tags.ruleObject;
    }

    initRulesSave(){}
    initParamsSearch(){}
    initParamsSave(){}
    initRuleObject(){
        this.rulesSave = Object.assign({});
    }
}