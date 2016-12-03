import {globalService} from "../../com.zippyttech.utils/globalService";
import {ModelBase} from "../../com.zippyttech.common/modelBase";

export class RuleModel extends ModelBase{
    public rules={};
    constructor(public myglobal:globalService){
        super('RULE','/rules/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['rule']={
            'type':'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'rule',
            'icon': 'fa fa-key',
            'title':'Regla',
            'placeholder':'Regla',
        };
        this.rules['name']={
            'type':'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'name',
            'icon': 'fa fa-list',
            'title':'Nombre',
            'placeholder':'Nombre',
        };
        this.rules = Object.assign({},this.rules,this.getRulesDefault())
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar regla";
        this.paramsSearch.placeholder="Ingrese codigo de la regla";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar regla"
    }
    initRuleObject() {
        this.ruleObject.title="Regla";
        this.ruleObject.placeholder="Ingrese codigo de la regla";
        this.ruleObject.key="rule";
        this.ruleObject.keyDisplay = "ruleName";
        this.ruleObject.code = "ruleId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }
}