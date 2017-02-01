import {BrandModel} from "../brand/brand.model";
import {ModelRoot} from "../../../com.zippyttech.common/modelRoot";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";


export class ModelModel extends ModelRoot{

    public brand:any;
    constructor(public db:DependenciesBase){
        super(db,'MOD','/models/');
        this.initModel();
    }
    modelExternal() {
        this.brand = new BrandModel(this.db);
    }
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
            'title': 'Modelo',
            'placeholder': 'Modelo',
        };
        this.rules['brand']=this.brand.ruleObject;
        this.rules['brand'].required=true;
        this.rules['brand'].update= this.permissions.update;

        this.rules = Object.assign({},this.rules,this.getRulesDefault())
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar modelo";
        this.paramsSearch.placeholder="Ingrese el modelo";
        this.paramsSearch.label.title="Marca";
        this.paramsSearch.label.detail="Modelo";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar modelo"
    }
    initRuleObject() {
        this.ruleObject.title="Modelo";
        this.ruleObject.placeholder="Ingrese el modelo";
        this.ruleObject.key="model";
        this.ruleObject.code="modelId";
        this.ruleObject.keyDisplay = "modelTitle";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
