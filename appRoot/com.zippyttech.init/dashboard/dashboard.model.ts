import {ModelRoot, IModelActions} from "../../com.zippyttech.common/modelRoot";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../com.zippyttech.club/catalog/record/record.model";
import {TradeModel} from "../../com.zippyttech.club/catalog/trade/trade.model";
import {QrcodeModel} from "../../com.zippyttech.club/catalog/qrcode/qrcode.model";
import {StaticFunction} from "../../com.zippyttech.utils/catalog/staticFunction";
import {OnInit} from "@angular/core";

export class DashboardModel extends ModelRoot{
    public record:RecordModel;
    public trade:TradeModel;
    public guest: QrcodeModel;

    constructor(public db:DependenciesBase){
        super(db,'/dashboard/');
        this.initModel();
    }

    modelExternal(){
        this.record = new RecordModel(this.db);
        this.trade = new TradeModel(this.db);
        this.guest = new QrcodeModel(this.db);

        this.record.ruleObject.title = "Vehiculos";
        this.trade.ruleObject.title = "Operaciones pendientes";
        this.guest.ruleObject.title = "Invitados";
        this.guest.setEndpoint("/guests/");


        this.guest.rest.max = 10;
        this.guest.paramsSearch.where=[{'op':'eq','field':'attended', 'value':false}];

        this.record.rest.max = 10;
        this.record.paramsSearch.where=[{'op':'isNull','field':'dateOut'},{'op':'isNotNull','field':'vehicle'},
                                        {'op':'eq','field':'enabled','value':true},
                                        {'op': 'ge', 'field': 'dateIn', 'value':StaticFunction.getDateRange('1').start, 'type':'date'},
                                        {'op': 'lt', 'field': 'dateIn', 'value':StaticFunction.getDateRange('1').end, 'type':'date'}
                                        ];

        this.trade.rest.max = 10;
        this.trade.paramsSearch.where=[{'op':'isNull','field':'receivedDate'}];

        if(this.record.permissions.list && this.permissions["vehicle"])
            this.record.loadDataWhere('',this.record.paramsSearch.where);

        if(this.guest.permissions.list && this.permissions["guest"])
            this.guest.loadDataWhere('',this.guest.paramsSearch.where);

        if(this.trade.permissions.list && this.permissions["trade"])
            this.trade.loadDataWhere('',this.trade.paramsSearch.where);

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
            if(key != "sponsor" && key != "guest" && key != "timeLimit" && key != "dateCreate") {
                that.guest.rules[key].visible = false;
                that.guest.rules[key].search = false;
            }
        });
        this.guest.rules['sponsor'].title = 'Patrocinador';

    }

    initRules(){}

    initPermissions() {
        this.permissions = {};
        this.permissions["trade"] = this.db.myglobal.existsPermission(['DASH_TRADE']);
        this.permissions["vehicle"] = this.db.myglobal.existsPermission(['DASH_VEHICLE']);
        this.permissions["guest"] = this.db.myglobal.existsPermission(['DASH_GUEST']);
    }

    initParamsSearch() {}

    initParamsSave() {}

    initRuleObject() {}

    initRulesSave() {}

    initModelActions(params: IModelActions){}
}
