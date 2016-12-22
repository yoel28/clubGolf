import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {QrcodeModel} from "./qrcode.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";

declare var SystemJS:any;
@Component({
    selector: 'qrCode',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class QrcodeComponent extends BaseViewInstance{

    constructor(public myglobal:globalService) {
        super();
    }

    initModel() {
        this.model= new QrcodeModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'QR';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el QR: ',
            'keyAction':'code'
        };
    }
}
