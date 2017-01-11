import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {ProductTypeModel} from "../productType/productType.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

export class ProductModel extends ModelBase{
    public rules={};
    public pathElements=StaticValues.pathElements;
    public productType:any;

    constructor(public db:DependenciesBase){
        super(db,'PRODUCT','/products/');
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
        this.rules['productType']=this.productType.ruleObject;
        this.rules['productType'].required = true;
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
        this.ruleObject.keyDisplay = "productCode";
        this.ruleObject.code = "productId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }
}