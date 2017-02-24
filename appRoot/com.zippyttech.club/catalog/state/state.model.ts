import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class StateModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'/states/');
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
        this.rules["productDisabling"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Bloquear', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'N/A', 'class': 'btn btn-sm btn-yellow'},
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
                {'value':true,'text': 'Bloquear', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'N/A', 'class': 'btn btn-sm btn-yellow'},
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
                {'value':true,'text': 'Bloquear', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'N/A', 'class': 'btn btn-sm btn-yellow'},
            ],
            "key": "qrDisabling",
            "title": "QR",
        };
        this.rules["billAdd"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Cobrar', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'N/A', 'class': 'btn btn-sm btn-yellow'},
            ],
            "key": "billAdd",
            "title": "Cobrar",
        };
        this.rules["mustComment"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Obligatorio', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'Opcional', 'class': 'btn btn-sm btn-yellow'},
            ],
            "key": "mustComment",
            "title": "Comentario",
        };
        this.globalOptional();
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar estado";
        this.paramsSearch.placeholder="Ingrese código del estado";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar estado"
    }
    initRuleObject() {
        this.ruleObject.title="Estado";
        this.ruleObject.placeholder="Código del estado";
        this.ruleObject.key="state";
        this.ruleObject.keyDisplay = "stateTitle";
        this.ruleObject.code = "stateId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.productDisabling;
        delete this.rulesSave.userDisabling;
        delete this.rulesSave.qrDisabling;
        delete this.rulesSave.billAdd;
        delete this.rulesSave.mustComment;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el estado: ';
        params['delete'].key = 'code';
    }
}