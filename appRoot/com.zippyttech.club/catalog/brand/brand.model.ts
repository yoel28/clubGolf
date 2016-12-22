import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";


export class BrandModel extends ModelBase{

    constructor(public myglobal:globalService){
        super('BRAND','/brands/',myglobal);
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
            'title': 'Título',
            'placeholder': 'Título',
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
        this.ruleObject.title="Marca";
        this.ruleObject.placeholder="Ingrese marca";
        this.ruleObject.key="brand";
        this.ruleObject.code="brandId";
        this.ruleObject.keyDisplay = "brandTitle";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
