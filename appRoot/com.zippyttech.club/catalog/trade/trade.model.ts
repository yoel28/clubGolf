import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {QrcodeModel} from "../qrcode/qrcode.model";
import {StateModel} from "../state/state.model";
import {ProductModel} from "../product/product.model";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class TradeModel extends ModelBase{

    private qr:any;
    private state:any;
    private product:any;
    private sponsor:any;

    constructor(public db:DependenciesBase){
        super(db,'/trades/');
        this.initModel();
    }

    modelExternal() {
        this.qr = new QrcodeModel(this.db);
        this.state = new StateModel(this.db);
        this.product = new ProductModel(this.db);

        this.sponsor = new UserModel(this.db);
    }

    initRules(){
        this.rules['entregado']={
            'type':'filter',
            'exclude':true,
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
        };


        this.rules['product']=this.product.ruleObject;
        this.rules['product'].update= this.permissions.update;

        this.rules['qrCode']=this.qr.ruleObject;
        this.rules['qrCode'].update= this.permissions.update;

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
        this.rules['sponsor'].title='Usuario';
        this.rules['sponsor'].keyDisplay='qr';
        this.rules['sponsor'].eval=this.db.myglobal.getRule('TRADE_USER_WEB');
        this.rules['sponsor'].placeholder='Usuario';
        this.rules['sponsor'].paramsSearch.field='sponsor.id';
        this.rules['sponsor'].update= this.permissions.update;



        this.rules['useTimeN']={
            'type': 'time',
            'search':false,
            'visible':this.permissions.visible,
            'key':'useTimeN',
            'keyDisplay':'useTimeS',
            'title': 'Tiempo de uso',
            'placeholder': 'Tiempo de uso (Milisegundos)',
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
        this.rules['state'].update= this.permissions.update;

        this.rules['usernameCreator']={
            'type': 'eval',
            'visible':this.permissions.visible,
            'eval':this.db.myglobal.getRule('TRADE_USERNAMECREATOR_WEB'),
            'key':'usernameCreator',
            'title': 'Operador entrega',
            'placeholder': 'Operador entrega',
        };

        this.rules['usernameUpdater']={
            'type': 'eval',
            'visible':this.permissions.visible,
            'key':'usernameUpdater',
            'eval':this.db.myglobal.getRule('TRADE_USERNAMEUPDATER_WEB'),
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

        this.rules['usePrice']={
            'type': 'number',
            'double':true,
            'visible':this.permissions.visible,
            'search':this.permissions.search,
            'key': 'usePrice',
            'title': 'Costo total',
            'placeholder': 'Costo total',
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules['detail'].title="Comentario";
        this.rules['detail'].placeholder="Ingrese un comentario";

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
        delete this.rulesSave.useTimeN;
        delete this.rulesSave.usernameCreator;
        delete this.rulesSave.usernameUpdater;
        delete this.rulesSave.entregado;
        delete this.rulesSave.usePrice;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar la operacion: ';
        params['delete'].key = 'id';
    }
}