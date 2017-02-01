import {ModelRoot} from "../../com.zippyttech.common/modelRoot";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../com.zippyttech.club/catalog/record/record.model";
import {TradeModel} from "../../com.zippyttech.club/catalog/trade/trade.model";
import {QrcodeModel} from "../../com.zippyttech.club/catalog/qrcode/qrcode.model";

export class DashboardModel extends ModelRoot{

    public record:RecordModel;
    public trade:TradeModel;
    public guest: QrcodeModel;
    public qr: QrcodeModel;

    constructor(public db:DependenciesBase){
        super(db,'DASH','/dashboard/');
        this.initModel();
    }

    modelExternal(){
        this.record = new RecordModel(this.db);
        this.trade = new TradeModel(this.db);
        this.guest = new QrcodeModel(this.db);
        this.qr = new QrcodeModel(this.db);

        this.record.ruleObject.title = "Vehiculos";
        this.trade.ruleObject.title = "Operaciones pendientes";
        this.guest.ruleObject.title = "Invitados";
        this.guest.setEndpoint("/guests/");


        this.guest.rest.max = 10;
        this.record.rest.max = 10;
        this.trade.rest.max = 10;

        this.record.paramsSearch.where=[{'op':'isNull','field':'dateOut'},{'op':'isNotNull','field':'vehicle'}];
        this.trade.paramsSearch.where=[{'op':'isNull','field':'receivedDate'}];
        this.guest.paramsSearch.where=[{'op':'eq','field':'attended', 'value':false}];

        if(this.record.permissions.list)
            this.record.loadDataWhere('',this.record.paramsSearch.where);

        if(this.trade.permissions.list)
            this.trade.loadDataWhere('',this.trade.paramsSearch.where);

        if(this.guest.permissions.list)
            this.guest.loadDataWhere('',this.guest.paramsSearch.where);

        let that=this;
        Object.keys(this.record.rules).forEach((key)=>{
            if(key != "dateIn" && key != "user" && key != "vehicle" && key != "userType" && key != ""){
                that.record.rules[key].visible = false;
                that.record.rules[key].search = false;
            }
        });

        Object.keys(this.trade.rules).forEach((key)=>{
            if(key != "dateCreated" && key != "product" && key != "sponsor" && key != "guest"){
                that.trade.rules[key].visible = false;
                that.trade.rules[key].search = false;
            }
        });

        Object.keys(this.guest.rules).forEach((key)=>{
            if(key != "sponsor" && key != "guest" && key != "timeLimit") {
                that.guest.rules[key].visible = false;
                that.guest.rules[key].search = false;
                that.qr.rules[key].visible = false;
            }
        });
        this.guest.rules['sponsor'].title = 'Email del patrocinador';
        this.guest.rules['sponsorName'] = {
            'object':true,
            'visible':true,
            'key': 'sponsorName',
            'keyDisplay':'sponsorName',
            'title': 'Patrocinador',
        };

    }

    initRules(){}

    initPermissions() {
        this.permissions = {};
        this.permissions["trade"] = this.db.myglobal.existsPermission(['DASH_TRADE']);
        this.permissions["vehicle"] = this.db.myglobal.existsPermission(['DASH_VEH']);
        this.permissions["guest"] = this.db.myglobal.existsPermission(['DASH_GUEST']);
        this.permissions["qr"] = this.db.myglobal.existsPermission(['DASH_QR']);
    }

    initParamsSearch() {}

    initParamsSave() {}

    initRuleObject() {}

    initRulesSave() {}

}
