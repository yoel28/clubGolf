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

        if(this.record.permissions.list)
            this.record.loadDataWhere('',[{'op':'isNull','field':'dateOut'}]);

        if(this.trade.permissions.list)
            this.trade.loadDataWhere('',[{'op':'isNull','field':'receivedDate'}]);

        if(this.guest.permissions.list)
            this.guest.loadDataWhere('',[{'op':'eq','field':'attended', 'value':false}]);

        let that=this;
        Object.keys(this.record.rules).forEach((key)=>{
            if(key != "dateIn" && key != "user" && key != "vehicle" && key != "userType" && key != "")
                that.record.rules[key].visible = false;
            if(that.record.rules[key].type =='date')
                that.record.rules[key].title = "fecha";
        });

        Object.keys(this.trade.rules).forEach((key)=>{
            if(key != "dateCreated" && key != "product" && key != "sponsor" && key != "guest")
                that.trade.rules[key].visible = false;
            if(that.trade.rules[key].type =='date')
                that.trade.rules[key].title = "fecha";
        });

        Object.keys(this.guest.rules).forEach((key)=>{
            if(key != "id" && key != "sponsor" && key != "guest" && key != "timeLimit") {
                that.guest.rules[key].visible = false;
                that.qr.rules[key].visible = false;
            }
        });
        this.qr.dataList = {};

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
