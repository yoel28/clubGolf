import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {VehicleModel} from "../vehicle/vehicle.model";


export class TagModel extends ModelBase{
    public vehicle:any;

    constructor(public myglobal:globalService){
        super('TAG','/tags/',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.vehicle = new VehicleModel(this.myglobal);
    }
    initRules() {
        this.rules['code'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '35',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'code',
            'title': 'Código',
            'placeholder': 'Código',
        };
        this.rules['epc'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '150',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'epc',
            'title': 'EPC',
            'placeholder': 'EPC',
        };
        this.rules['vehicle'] = this.vehicle.ruleObject;
        this.rules['vehicle'].required=false;

        this.rules = Object.assign({},this.rules,this.getRulesDefault())
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar tag";
        this.paramsSearch.placeholder="Ingrese el tag";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar tag";
    }
    initRuleObject() {
        this.ruleObject.title="Tag";
        this.ruleObject.placeholder="Ingrese el tag";
        this.ruleObject.key="tag";
        this.ruleObject.code="tagId";
        this.ruleObject.keyDisplay = "tagCode";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.vehicle;
    }

}
