import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {QrcodeModel} from "../qrcode/qrcode.model";
import {StateModel} from "../state/state.model";
import {ProductModel} from "../product/product.model";
import {ProductTypeModel} from "../productType/productType.model";

export class TradeModel extends ModelBase{
    public rules={};
    public pathElements=StaticValues.pathElements;
    public qr:any;
    public state:any;
    public product:any;
    public productType:any;

    constructor(public myglobal:globalService){
        super('TRADE','/trades/',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.qr = new QrcodeModel(this.myglobal);
        this.state = new StateModel(this.myglobal);
        this.product = new ProductModel(this.myglobal);
        this.productType = new ProductTypeModel(this.myglobal);

    }
    initRules(){
        this.rules['qrCode']=Object.assign({},this.qr.ruleObject);
        this.rules['state']=Object.assign({},this.state.ruleObject);
        this.rules["received"] = {
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'SI', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'NO', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "received",
            "title": "Recibido",
            "placeholder": "Recibido",
        };
        this.rules['receivedDate']={
            'type': 'date',
            'required':true,
            'format':StaticValues.formatDatePickerDDMMYYYY,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'receivedDate',
            'title': 'Fecha',
            'placeholder': 'Fecha',
        };
        this.rules['product']=Object.assign({},this.product.ruleObject);

        this.rules['title']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'title',
            'title': 'Titulo',
            'placeholder': 'Titulo',
        };
        this.rules['productTypePrice']={
            'type': 'number',
            'double':true,
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'productTypePrice',
            'title': 'Precio',
            'placeholder': 'Precio',
        };
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar operación";
        this.paramsSearch.placeholder="Ingrese codigo de la operación";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar operación"
    }
    initRuleObject() {
        this.ruleObject.title="Operación";
        this.ruleObject.placeholder="Ingrese codigo de la operación";
        this.ruleObject.key="trade";
        this.ruleObject.keyDisplay = "tradeId";
        this.ruleObject.code = "tradeId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        delete this.rulesSave.title;
    }
}