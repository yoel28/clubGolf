import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";

export class ContractModel extends ModelBase{

    constructor(public myglobal:globalService){
        super('CONT','/contracts/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['title']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'title',
            'title': 'Título',
            'placeholder': 'Título',
        };
        this.rules['code']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'title': 'Código',
            'placeholder': 'Código',
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar contracto";
        this.paramsSearch.placeholder="Ingrese el contracto";
        this.paramsSearch.label.title="Titulo: ";
        this.paramsSearch.label.detail="Código: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar contracto"
    }
    initRuleObject() {
        this.ruleObject.title="Contracto";
        this.ruleObject.placeholder="Ingrese el contracto";
        this.ruleObject.key="contract";
        this.ruleObject.keyDisplay="contractCode";
        this.ruleObject.code="contractId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
