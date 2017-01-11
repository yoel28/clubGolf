import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

export class ProductTypeModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'PRTYPE','/type/products/');
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['autoReceive']={
            'type':'boolean',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'autoReceive',
            'icon': 'fa fa-key',
            'title':'Auto recibido',
            'placeholder':'Auto recibido',
            'source': [
                {'value':true, 'text': 'Activado', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'Desactivado', 'class': 'btn btn-sm btn-red'},
            ],
        };

        this.rules['icon']= {
            'type': 'image',
            'required':false,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'icon',
            'icon': 'fa fa-key',
            'default':this.db.pathElements.warning,
            'title': 'Imagen',
            'placeholder': 'Ingrese una imagen',
        };

        this.rules['title']={
            'type':'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'title',
            'icon': 'fa fa-list',
            'title':'Nombre',
            'placeholder':'Nombre',
        };
        this.rules['intervalMinutes']={
            'type':'number',
            'step':'1',
            'disabled':'data.type == "unidad"',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'intervalMinutes',
            'icon': 'fa fa-list',
            'title':'Intervalo',
            'placeholder':'Minutos',
        };

        this.rules['type']={
            'type':'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'type',
            'title':'Tipo',
            'placeholder':'Tipo',
            'source':[
                {'value':'unidad','text': 'Unidad', 'class': 'btn btn-sm btn-green'},
                {'value':'tiempo','text': 'Tiempo', 'class': 'btn btn-sm btn-red'},
            ]
        };
        this.rules['minPrice']={
            'type':'number',
            'required':true,
            'double':true,
            'step':'0.1',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'minPrice',
            'icon': 'fa fa-list',
            'title':'Precio mínimo',
            'placeholder':'Precio mínimo',
        };
        this.rules['minMinutes']={
            'type':'number',
            'required':true,
            'double':true,
            'step':'0.1',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'minMinutes',
            'icon': 'fa fa-list',
            'title':'Minutos mínimos',
            'placeholder':'Minutos mínimos',
        };
        this.rules['price']={
            'type':'number',
            'required':true,
            'double':true,
            'step':'0.01',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key':'price',
            'icon': 'fa fa-list',
            'title':'Precio',
            'placeholder':'Precio',
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());

        this.rules['detail'].required=true;
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar tipo de producto";
        this.paramsSearch.placeholder="Ingrese codigo del tipo de producto";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar tipo de producto"
    }
    initRuleObject() {
        this.ruleObject.title="Tipo de producto";
        this.ruleObject.placeholder="Ingrese codigo del tipo de producto";
        this.ruleObject.key="productType";
        this.ruleObject.keyDisplay = "productTypeTitle";
        this.ruleObject.code = "productTypeId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.autoReceive;
        delete this.rulesSave.icon;
    }
}