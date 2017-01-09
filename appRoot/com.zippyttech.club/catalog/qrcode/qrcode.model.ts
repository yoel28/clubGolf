import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";

export class QrcodeModel extends ModelBase{
    public rules={};
    public pathElements=StaticValues.pathElements;
    public sponsor:any;
    public guest:any;

    constructor(public myglobal:globalService){
        super('QRCODE','/qr/codes/',myglobal);
        this.initModel();
    }
    modelExternal() {
        this.sponsor = new UserModel(this.myglobal);
        this.guest = new UserModel(this.myglobal);
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

        this.rules['sponsor']=Object.assign({},this.sponsor.ruleObject);
        this.rules['sponsor'].title='Patrocinador';
        this.rules['sponsor'].keyDisplay='sponsorEmail';
        this.rules['sponsor'].key='sponsor';
        this.rules['sponsor'].required=false;
        this.rules['sponsor'].placeholder='Patrocinador';
        this.rules['sponsor'].paramsSearch.field='sponsor.id';

        this.rules['guest']=Object.assign({},this.guest.ruleObject);
        this.rules['guest'].title='Invitado';
        this.rules['guest'].keyDisplay='guestEmail';
        this.rules['guest'].key='guest';
        this.rules['guest'].required=false;
        this.rules['guest'].placeholder='Invitado';
        this.rules['guest'].paramsSearch.field='guest.id';





        this.rules['timeLimit']={
            'type': 'date',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'timeLimit',
            'format':StaticValues.formatDatePickerDDMMYYYY,
            'title': 'Tiempo limite',
            'placeholder': 'Tiempo limite',
        };
        this.rules['guestAdd']={
            'type': 'number',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'guestAdd',
            'title': 'Invitados',
            'placeholder': 'Invitados',
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

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        delete this.rules['detail'];
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar QR";
        this.paramsSearch.placeholder="Ingrese codigo del QR";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar QR"
    }
    initRuleObject() {
        this.ruleObject.title="QR";
        this.ruleObject.placeholder="Ingrese codigo del QR";
        this.ruleObject.key="qrId";
        this.ruleObject.keyDisplay = "qrId";
        this.ruleObject.code = "qrId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);

        delete this.rules['email'];

        delete this.rulesSave.enabled;
        delete this.rulesSave.code;
        delete this.rulesSave.guest;
        delete this.rulesSave.id;
    }
}