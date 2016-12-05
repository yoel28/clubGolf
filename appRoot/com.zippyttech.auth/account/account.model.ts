import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {globalService} from "../../com.zippyttech.utils/globalService";

export class AccountModel extends ModelBase{
    public rules={};
    constructor(public myglobal:globalService){
        super('ACCOUNT','/accounts/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules(){

        this.rules['logo']={
            'type': 'image',
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'logo',
            'title': 'Logo',
            'placeholder': 'Logo',
        };

        this.rules['name']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'name',
            'title': 'Nombre',
            'placeholder': 'Nombre',
        };

        this.rules['ruc']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'ruc',
            'title': 'RUC',
            'placeholder': 'RUC',
        };

        this.rules['contact']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'contact',
            'title': 'Contacto',
            'placeholder': 'Contacto',
        };

        this.rules['address']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'address',
            'icon': 'fa fa-list',
            'title': 'Dirección',
            'placeholder': 'Dirección',
        };

        this.rules['url']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'url',
            'title': 'URL',
            'placeholder': 'URL',
        };

        this.rules['email']={
            'type': 'text',
            'required':true,
            'email':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'email',
            'title': 'Correo',
            'placeholder': 'Correo',
        };

        this.rules['maxUserCount']={
            'type': 'number',
            'required':true,
            'step':'0.1',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'maxUserCount',
            'title': 'Usuarios',
            'placeholder': 'Usuarios',
        };

        this.rules['phone']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'phone',
            'title': 'Teléfono',
            'placeholder': 'Teléfono',
        };

        this.rules['miniLogo']={
            'type': 'image',
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'miniLogo',
            'title': 'Mini logo',
            'placeholder': 'Mini Logo',
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());

    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar cuenta";
        this.paramsSearch.placeholder="Ingrese la cuenta";
        this.paramsSearch.label.title="Título: ";
        this.paramsSearch.label.detail="Detalle: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar cuenta"
    }
    initRuleObject() {
        this.ruleObject.title="Cuentas";
        this.ruleObject.placeholder="Ingrese una cuenta";
        this.ruleObject.key="account";
        this.ruleObject.keyDisplay="accountRuc";
        this.ruleObject.code="accountId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.miniLogo;
    }

}