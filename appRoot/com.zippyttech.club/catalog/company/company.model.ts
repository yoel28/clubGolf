import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";

export class CompanyModel extends ModelBase{

    constructor(public myglobal:globalService){
        super('COMPANY','/companies/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['title']={
            'type': 'text',
            'required':true,
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
        this.paramsSearch.title="Buscar empresa";
        this.paramsSearch.placeholder="Ingrese la empresa";
        this.paramsSearch.label.title="Titulo: ";
        this.paramsSearch.label.detail="Código: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar empresa"
    }
    initRuleObject() {
        this.ruleObject.title="Empresas";
        this.ruleObject.placeholder="Ingrese la empresa";
        this.ruleObject.key="company";
        this.ruleObject.keyDisplay="companyTitle";
        this.ruleObject.code="companyId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
