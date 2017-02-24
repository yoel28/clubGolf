import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {ProductTypeModel} from "../productType/productType.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class ProductModel extends ModelBase{

    public productType:any;

    constructor(public db:DependenciesBase){
        super(db,'/products/');
        this.initModel();
    }
    modelExternal() {
        this.productType = new ProductTypeModel(this.db);
    }
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

        this.rules["available"] = {
            "visible": this.permissions.visible,
            "search": this.permissions.filter,
            "type": "boolean",
            "disabled":"!data.enabled",
            'source': [
                {'value':true,'text': 'Disponible', 'class': 'btn btn-sm btn-green','title':'Disponible'},
                {'value':false,'text': 'No disponible', 'class': 'btn btn-sm btn-red','title':'No disponible'},
            ],
            "key": "available",
            "title": "Disponible",
            "placeholder": "Producto disponible",
        };

        this.rules['productType']=this.productType.ruleObject;
        this.rules['productType'].required = true;
        this.rules['productType'].update= this.permissions.update;

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
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
        this.ruleObject.keyDisplay = "product";
        this.ruleObject.eval=this.db.myglobal.getRule('PRODUCT_DISPLAY_WEB');
        this.ruleObject.code = "productId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.available;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el producto: ';
        params['delete'].key = 'code';
    }
}