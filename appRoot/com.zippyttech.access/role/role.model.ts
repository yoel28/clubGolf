import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {globalService} from "../../com.zippyttech.utils/globalService";

export class RoleModel extends ModelBase{
    public rules={};
    constructor(public myglobal:globalService){
        super('ROLE','/roles/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['authority']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'reference',
            'title': 'ROLE',
            'prefix':'ROLE_',
            'placeholder': 'Nombre del perfil',
        };
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        delete this.rules['detail'];
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar rol";
        this.paramsSearch.placeholder="Ingrese el rol";
        this.paramsSearch.label.title="Título: ";
        this.paramsSearch.label.detail="Detalle: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar rol"
    }
    initRuleObject() {
        this.ruleObject.title="Roles";
        this.ruleObject.placeholder="Ingrese un rol";
        this.ruleObject.key="roles";
        this.ruleObject.keyDisplay="roleAuthority";
        this.ruleObject.code="roleId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}