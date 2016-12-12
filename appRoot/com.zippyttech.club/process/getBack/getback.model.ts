import {globalService} from "../../../com.zippyttech.utils/globalService";
import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {StateModel} from "../../catalog/state/state.model";


export class GetbackModel extends ModelBase{
    public rules={};
    public pathElements=StaticValues.pathElements;
    public state:any;

    constructor(public myglobal:globalService){
        super('GETBACK','/getback/',myglobal);
        this.initModel(false);
        this.loadData();
    }
    modelExternal() {
        this.state = new StateModel(this.myglobal);
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
            'icon': 'fa fa-list',
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
        this.rules['state'].type= 'select';
        this.rules['state'].mode= 'popup';
        this.rules['state'].source=[];

        this.rules = Object.assign({},this.rules,this.getRulesDefault());

        this.rules['detail'].mode='popup';
        delete this.rules['enabled'];
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar producto";
        this.paramsSearch.placeholder="Ingrese codigo del producto";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar producto"
    }
    initRuleObject() {
        this.ruleObject.title="Producto";
        this.ruleObject.placeholder="Ingrese codigo del producto";
        this.ruleObject.key="product";
        this.ruleObject.keyDisplay = "productCode";
        this.ruleObject.code = "productId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }
    loadData()
    {
        let that = this;
        let successCallback= response => {
            let data =  response.json();
            data.list.forEach(obj=> {
                that.rules['state'].source.push({'value': obj.id, 'text': obj.code + ' ('+obj.title+')' });
            });
            that.completed = true;
        }
        this.state.loadDataModel(successCallback)
    }
}