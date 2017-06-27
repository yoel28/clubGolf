import {ModelRoot, IModelActions} from "../../../com.zippyttech.common/modelRoot";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";


export class BrandModel extends ModelRoot{

    constructor(public db:DependenciesBase){
        super(db,'/brands/');
        this.initModel();
    }
    modelExternal() {}
    initRules() {
        this.rules['title'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '35',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'title',
            'title': 'Marca',
            'placeholder': 'Marca',
        };
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules['detail'].required=true;
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar marca";
        this.paramsSearch.placeholder="Ingrese la marca";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar marca"
    }
    initRuleObject() {
        this.ruleObject.title="Marca de vehículo";
        this.ruleObject.placeholder="Ingrese marca";
        this.ruleObject.key="brand";
        this.ruleObject.code="brandId";
        this.ruleObject.keyDisplay = "brandTitle";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar la marca: ';
        params['delete'].key = 'title';
    }
}
