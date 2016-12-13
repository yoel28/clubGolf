import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {globalService} from "../../com.zippyttech.utils/globalService";

export class PermissionModel extends ModelBase{
    public rules={};
    constructor(public myglobal:globalService){
        super('PERM','/permissions/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules(){
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
        this.rules['module']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'module',
            'title': 'Modulo',
            'placeholder': 'Modulo',
        };
        this.rules['controller']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'controller',
            'title': 'Controlador',
            'placeholder': 'Controlador',
        };
        this.rules['action']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'action',
            'title': 'Acción',
            'placeholder': 'Acción',
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules['detail'].required=true;
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar permiso";
        this.paramsSearch.placeholder="Ingrese permiso";
        this.paramsSearch.label.title="Código: ";
        this.paramsSearch.label.detail="Detalle: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar permiso"
    }
    initRuleObject() {
        this.ruleObject.title="permiso";
        this.ruleObject.placeholder="Ingrese permiso";
        this.ruleObject.key="permission";
        this.ruleObject.keyDisplay="permissionCode";
        this.ruleObject.code="permissionId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}