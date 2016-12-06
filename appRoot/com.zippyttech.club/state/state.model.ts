import {globalService} from "../../com.zippyttech.utils/globalService";
import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";

export class StateModel extends ModelBase{
    public rules={};
    public pathElements=StaticValues.pathElements;

    constructor(public myglobal:globalService){
        super('STATE','/state/',myglobal);
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
        this.rules["productDisabling"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Activo', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'Inactivo', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "productDisabling",
            "title": "Producto",
        };
        this.rules["userDisabling"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Activo', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'Inactivo', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "userDisabling",
            "title": "Usuario",
        };
        this.rules["qrDisabling"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Activo', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'Inactivo', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "qrDisabling",
            "title": "QR",
        };
        
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar estado";
        this.paramsSearch.placeholder="Ingrese codigo del estado";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar estado"
    }
    initRuleObject() {
        this.ruleObject.title="Estado";
        this.ruleObject.placeholder="Ingrese codigo del estado";
        this.ruleObject.key="status";
        this.ruleObject.keyDisplay = "statusCode";
        this.ruleObject.code = "statusId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }
}