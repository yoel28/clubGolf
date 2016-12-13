import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {TradeModel} from "./trade.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";

declare var SystemJS:any;
@Component({
    selector: 'trade',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class TradeComponent extends BaseViewInstance{

    public sponsor:any;
    public guest:any;
    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new TradeModel(this.myglobal);
        this.sponsor = new UserModel(this.myglobal);
        this.guest = new UserModel(this.myglobal);

        this.model.rules['sponsor'] = Object.assign({},this.sponsor.ruleObject);
        this.model.rules['sponsor'].key='sponsor';
        this.model.rules['sponsor'].title='Patrocinador';
        this.model.rules['sponsor'].keyDisplay='sponsorName';
        this.model.rules['sponsor'].placeholder='Patrocinador';
        this.model.rules['sponsor'].paramsSearch.field='sponsor.id';

        this.model.rules['guest'] = Object.assign({},this.guest.ruleObject);
        this.model.rules['guest'].key='guest';
        this.model.rules['guest'].title='Invitado';
        this.model.rules['guest'].keyDisplay='guestName';
        this.model.rules['guest'].placeholder='Invitado';
        this.model.rules['guest'].paramsSearch.field='guest.id';

    }

    initViewOptions() {
        this.viewOptions["title"] = 'Operaciones';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la operación: ',
            'keyAction':'id'
        };
    }
}
