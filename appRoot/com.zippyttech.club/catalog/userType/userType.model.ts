import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";


export class UserTypeModel extends ModelBase{

    constructor(public myglobal:globalService){
        super('US_TYPE','/type/users/',myglobal);
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
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar tipo de usuario";
        this.paramsSearch.placeholder="Ingrese el tipo de usuario";
        this.paramsSearch.label.title="Codigo: ";
        this.paramsSearch.label.detail="Nombre: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar tipo de usuario"
    }
    initRuleObject() {
        this.ruleObject.title="Tipo";
        this.ruleObject.placeholder="Ingrese el tipo de usuario";
        this.ruleObject.key="userType";
        this.ruleObject.code="userTypeId";
        this.ruleObject.keyDisplay = "userTypeTitle";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
