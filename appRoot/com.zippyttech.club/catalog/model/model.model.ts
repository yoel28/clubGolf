import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BrandModel} from "../brand/brand.model";
import {ModelRoot} from "../../../com.zippyttech.common/modelRoot";


export class ModelModel extends ModelRoot{

    public brand:any;
    constructor(public myglobal:globalService){
        super('MOD','/models/',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.brand = new BrandModel(this.myglobal);
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
            'title': 'Título',
            'placeholder': 'Título',
        };
        this.rules['brand']=this.brand.ruleObject;
        this.rules['brand'].required=true;

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
