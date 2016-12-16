import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {TagModel} from "../tag/tag.model";
import {ModelModel} from "../model/model.model";
import {BrandModel} from "../brand/brand.model";
import {VehicleTypeModel} from "../vehicleType/vehicleType.model";

export class VehicleModel extends ModelBase{

    public vehicleType:any;
    public brand:any;
    public model:any;
    public user:any;

    constructor(public myglobal:globalService){
        super('VEH','/vehicles/',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.user = new UserModel(this.myglobal);
        this.model = new ModelModel(this.myglobal);
        this.brand = new BrandModel(this.myglobal);
        this.vehicleType = new VehicleTypeModel(this.myglobal);

    }
    initRules() {

        this.rules['plate'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '35',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'plate',
            'title': 'Placa',
            'placeholder': 'Placa del vehículo',
        };

        this.rules['owner'] = this.user.ruleObject;
        this.rules['owner'].required=true;

        this.rules['year'] = {
            'type': 'number',
            'icon': 'fa fa-font',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'year',
            'title': 'Año',
            'placeholder': 'Año del vehículo',
        };
        this.rules['color']= {
            'type': 'text',
            'icon':'fa fa-font',
            'maxLength':'35',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'color',
            'title': 'Color',
            'placeholder': 'Color del vehículo',
        };

        this.rules['brand'] = this.brand.ruleObject;
        this.rules['brand'].required=false;

        this.rules['model'] = this.model.ruleObject;
        this.rules['model'].required=false;

        this.rules['vehicleType'] = this.vehicleType.ruleObject;
        this.rules['vehicleType'].required=false;

        this.rules = Object.assign({},this.rules,this.getRulesDefault())
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar vehículo";
        this.paramsSearch.placeholder="Ingrese vehículo";
        this.paramsSearch.label.title="Propietario: ";
        this.paramsSearch.label.detail="Placa: ";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar vehículo"
    }
    initRuleObject() {
        this.ruleObject.title="Vehículo";
        this.ruleObject.placeholder="Ingrese vehículo";
        this.ruleObject.key="vehicle";
        this.ruleObject.code="vehicleId";
        this.ruleObject.keyDisplay = "vehiclePlate";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.tag;
    }

}
