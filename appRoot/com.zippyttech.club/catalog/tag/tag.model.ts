import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {VehicleModel} from "../vehicle/vehicle.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";


export class TagModel extends ModelBase{
    private vehicle:any;

    constructor(public db:DependenciesBase){
        super(db,'/tags/');
        this.initModel();
    }
    modelExternal() {
        this.vehicle = new VehicleModel(this.db);
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
        this.rules['vehicle'].update= this.permissions.update;


        this.rules = Object.assign({},this.rules,this.getRulesDefault())
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar tag";
        this.paramsSearch.placeholder="Ingrese el tag";
        this.paramsSearch.label.title='Vehículo (Placa): ';
        this.paramsSearch.label.detail='EPC (TAG): ';
    }
    initParamsSave() {
        this.paramsSave.title="Agregar tag";
    }
    initRuleObject() {
        this.ruleObject.title="Tag";
        this.ruleObject.placeholder="Ingrese el tag";
        this.ruleObject.key="tag";
        this.ruleObject.code="tagId";
        this.ruleObject.exclude=true;

        this.ruleObject.keyDisplay = "tagCode";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.vehicle;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el tag: ';
        params['delete'].key = 'code';
    }

}
