import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";

export class UserStatusModel extends ModelBase{

    constructor(public myglobal:globalService){
        super('US_STATUS','/statuses/',myglobal);
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
        this.paramsSearch.title="Buscar estatus de usuario";
        this.paramsSearch.placeholder="Ingrese el estatus de usuario";
        this.paramsSearch.label.title="Codigo: ";
        this.paramsSearch.label.detail="Nombre: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar estatus de usuario"
    }
    initRuleObject() {
        this.ruleObject.title="Estatus";
        this.ruleObject.placeholder="Ingrese el estatus de usuario";
        this.ruleObject.key="userStatus";
        this.ruleObject.keyDisplay="userStatusTitle";
        this.ruleObject.code="userStatusId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
