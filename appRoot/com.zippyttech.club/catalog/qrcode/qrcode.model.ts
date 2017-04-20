import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class QrcodeModel extends ModelBase{

    public sponsor:any;
    public guest:any;

    constructor(public db:DependenciesBase){
        super(db,'/qr/codes/');
        this.initModel();
    }
    modelExternal() {
        this.sponsor = new UserModel(this.db,false);
        this.guest = new UserModel(this.db,false);
    }
    initRules(){

        this.rules['id']={
            'type': 'number',
            'visible':this.permissions.visible,
            'search':this.permissions.search,
            'title': 'Código',
            'iconVisible':'fa fa-qrcode',
            'placeholder': 'Código',
        };

        this.rules['email']={
            'type': 'text',
            'email': true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'email',
            'title': 'Correo',
            'placeholder': 'Correo',
        };

        this.rules['priceUptake']={
            'type': 'number',
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'priceUptake',
            'title': 'Consumo',
            'placeholder': 'Consumo',
        };

        this.rules['sponsor']=Object.assign({},this.sponsor.ruleObject);
        this.rules['sponsor'].title='Patrocinador';
        this.rules['sponsor'].keyDisplay='sponsor';
        this.rules['sponsor'].key='sponsor';
        this.rules['sponsor'].update= this.permissions.update;
        this.rules['sponsor'].required=false;
        this.rules['sponsor'].eval=this.db.myglobal.getRule('QR_SPONSOR_WEB');
        this.rules['sponsor'].placeholder='Patrocinador';
        this.rules['sponsor'].paramsSearch.field='sponsor.id';

        this.rules['guest']=Object.assign({},this.guest.ruleObject);
        this.rules['guest'].title='Invitado';
        this.rules['guest'].keyDisplay='guest';
        this.rules['guest'].key='guest';
        this.rules['guest'].update= this.permissions.update;
        this.rules['guest'].required=false;
        this.rules['guest'].eval=this.db.myglobal.getRule('QR_GUEST_WEB');
        this.rules['guest'].placeholder='Invitado';
        this.rules['guest'].paramsSearch.field='guest.id';

        this.rules['guestAdd']={
            'type': 'number',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'guestAdd',
            'title': 'Invitados permitidos',
            'placeholder': 'Invitados permitidos',
        };

        this.rules['priceLimit']={
            'type': 'number',
            'double':true,
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'priceLimit',
            'title': 'Precio limite',
            'placeholder': 'Precio limite',
        };
        this.setRuleDateCreated(true);
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules['dateCreated'].visible = true;

        this.rules['timeLimit']={
            'type': 'combodate',
            'date':'datetime',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'timeLimit',
            'title': 'Tiempo limite',
            'placeholder': 'Tiempo limite',
        };

        this.rules['attended']={
            'type':'filter',
            'exclude':true,
            'search':this.permissions.filter,
            'where': {
                'true': {'op': 'isNotNull', 'field': 'attended'},
                'false': {'op': 'isNull', 'field': 'attended'}
            },
            'source':[
                {'value':true,'text':'Atendido'},
                {'value':false,'text':'No atendido'}
            ],
            'placeholder':'¿QR atendido?'
        };

        delete this.rules['detail'];
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar QR";
        this.paramsSearch.placeholder="Ingrese codigo del QR";
        this.paramsSearch.label.title='ID: ';
        this.paramsSearch.label.detail='';
    }
    initParamsSave() {
        this.paramsSave.title="Agregar QR"
    }
    initRuleObject() {
        this.ruleObject.title="QR";
        this.ruleObject.placeholder="Ingrese codigo del QR";
        this.ruleObject.key="qrCode";
        this.ruleObject.keyDisplay = "qrCodeId";
        this.ruleObject.code = "qrCodeId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);

        delete this.rules['email'];

        delete this.rulesSave.enabled;
        delete this.rulesSave.code;
        delete this.rulesSave.guest;
        delete this.rulesSave.id;
        delete this.rulesSave.priceUptake;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el qr: ';
        params['delete'].key = 'id';
    }
}