import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {QrcodeModel} from "../qrcode/qrcode.model";
import {StateModel} from "../state/state.model";
import {ProductModel} from "../product/product.model";
import {ProductTypeModel} from "../productType/productType.model";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";

export class TradeModel extends ModelBase{
    public rules={};
    public pathElements=StaticValues.pathElements;
    public qr:any;
    public state:any;
    public product:any;
    public productType:any;
    public sponsor:any;
    public guest:any;

    constructor(public myglobal:globalService){
        super('TRADE','/trades/',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.qr = new QrcodeModel(this.myglobal);
        this.state = new StateModel(this.myglobal);
        this.product = new ProductModel(this.myglobal);
        this.productType = new ProductTypeModel(this.myglobal);

        this.sponsor = new UserModel(this.myglobal);
        this.guest = new UserModel(this.myglobal);
    }
    initRules(){
        this.rules['entregado']={
            'type':'filter',
            'search':this.permissions.filter,
            'where': {
                'Entregados': {'op': 'isNotNull', 'field': 'receivedDate'},
                'No entregados': {'op': 'isNull', 'field': 'receivedDate'}
            },
            'source':[
                {'value':'Entregados','text':'Entregados'},
                {'value':'No entregados','text':'No entregados'}
            ],
            'placeholder':'¿Productos entregados?'
        }

        this.rules['id']={
            'type': 'number',
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'id',
            'title': 'Operación',
            'placeholder': 'Operación',
        };

        this.rules['sponsor'] = Object.assign({},this.sponsor.ruleObject);
        this.rules['sponsor'].key='sponsor';
        this.rules['sponsor'].title='Patrocinador';
        this.rules['sponsor'].keyDisplay='sponsorName';
        this.rules['sponsor'].placeholder='Patrocinador';
        this.rules['sponsor'].paramsSearch.field='s.id';

        this.rules['guest'] = Object.assign({},this.guest.ruleObject);
        this.rules['guest'].key='guest';
        this.rules['guest'].title='Invitado';
        this.rules['guest'].keyDisplay='guestName';
        this.rules['guest'].placeholder='Invitado';
        this.rules['guest'].paramsSearch.field='g.id';

        this.rules['product']=Object.assign({},this.product.ruleObject);
        this.rules['product'].title="Cod. Producto";

        this.rules['title']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'title',
            'title': 'Producto',
            'placeholder': 'Producto',
        };

        this.rules['dateCreated']={
            'type': 'date',
            'required':true,
            'format':StaticValues.formatDatePickerDDMMYYYY,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'dateCreated',
            'title': 'Fecha del pedido',
            'placeholder': 'Fecha del pedido',
        };
        this.rules['receivedDate']={
            'type': 'date',
            'required':true,
            'format':StaticValues.formatDatePickerDDMMYYYY,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'receivedDate',
            'title': 'Fecha de entrega',
            'placeholder': 'Fecha de entrega',
        };

        this.rules['timeUse']={
            'type': 'eval',
            'visible':this.permissions.visible,
            'eval':'this.formatTime(moment(data.receivedDate).valueOf() - moment(data.dateCreated).valueOf())',
            'title': 'Tiempo de uso',
            'placeholder': 'Tiempo de uso',
        };
        this.rules["byClient"] = {
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'SI', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'NO', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "byClient",
            "title": "Entrego Cliente",
            "placeholder": "Entrego Cliente",
        };
        this.rules['state']=Object.assign({},this.state.ruleObject);
        this.rules['comment']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'comment',
            'title': 'Descripción',
            'placeholder': 'Descripción',
        };
        this.rules['usernameCreator']={
            'type': 'eval',
            'visible':this.permissions.visible,
            'eval':'data.usernameCreator?data.usernameCreator.split("/")[1]:""',
            'title': 'Operador entrega',
            'placeholder': 'Operador entrega',

        };
        this.rules['usernameUpdater']={
            'type': 'eval',
            'visible':this.permissions.visible,
            'eval':'data.usernameUpdater?data.usernameUpdater.split("/")[1]:""',
            'title': 'Operador recepción',
            'placeholder': 'Operador recepción',

        };
        this.rules['productTypePrice']={
            'type': 'number',
            'double':true,
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'productTypePrice',
            'title': 'Costo',
            'placeholder': 'Costo',
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
        delete this.rulesSave.id;
        delete this.rulesSave.sponsor;
        delete this.rulesSave.guest;
        delete this.rulesSave.timeUse;
        delete this.rulesSave.usernameCreator;
        delete this.rulesSave.usernameUpdater;
        delete this.rulesSave.entregado;
    }
}