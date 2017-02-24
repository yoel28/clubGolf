import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StateModel} from "../../catalog/state/state.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";


export class GetbackModel extends ModelBase{
    private state:any;

    constructor(public db:DependenciesBase){
        super(db,'/getback/');
        this.initModel(false);
        this.loadDataExternal();
    }
    modelExternal() {
        this.state = new StateModel(this.db);
    }
    initRules(){
        this.rules['code']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'title': 'Código del producto',
            'placeholder': 'Código del producto',
        };
        this.rules["byClient"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'required': true,
            "type": "boolean",
            'source': [
                {'value':true,'text': 'SI', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'NO', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "byClient",
            "title": "Entregado por el cliente",
            "placeholder": "",
        };

        this.rules['state']=this.state.ruleObject;
        this.rules['state'].required = true;
        this.rules['state'].icon = '';
        this.rules['state'].type= 'select';
        this.rules['state'].mode= 'popup';
        this.rules['state'].object = false;
        this.rules['state'].source=[];
        this.rules['state'].data={};
        this.rules['state'].update= this.permissions.update;

        this.rules = Object.assign({},this.rules,this.getRulesDefault());

        this.rules['detail'].mode='popup';
        delete this.rules['enabled'];
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar producto";
        this.paramsSearch.placeholder="Ingrese código del producto";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar producto"
    }
    initRuleObject() {
        this.ruleObject.title="Producto";
        this.ruleObject.placeholder="Ingrese código del producto";
        this.ruleObject.key="product";
        this.ruleObject.keyDisplay = "productCode";
        this.ruleObject.code = "productId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }
    loadDataExternal()
    {
        let that = this;
        this.state.loadData().then(
            response => {
                if(that.state.dataList && that.state.dataList.list)
                {
                    that.state.dataList.list.forEach(obj=> {
                        that.rules['state'].source.push({'value': obj.id, 'text': obj.code + ' ('+obj.title+')' });
                        that.rules['state'].data[obj.id]=obj;
                    });
                }
                that.completed = true;
            }
        )
    }

    initModelActions(params: IModelActions){}
}