import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";


export class VehicleTypeModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'VEHTYPE','/type/vehicles/');
        this.initModel();
    }
    modelExternal() {}
    initRules() {
        this.rules['title'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '100',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'title',
            'title': 'Título',
            'placeholder': 'Título',
        };
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules['detail'].required=true;
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar tipo de vehículo";
        this.paramsSearch.placeholder="Ingrese el tipo de vehículo";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar tipo de vehículo"
    }
    initRuleObject() {
        this.ruleObject.title="Tipo de vehículo";
        this.ruleObject.placeholder="Ingrese el tipo de vehículo";
        this.ruleObject.key="vehicleType";
        this.ruleObject.code="vehicleTypeId";
        this.ruleObject.keyDisplay = "vehicleTypeTitle";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}

