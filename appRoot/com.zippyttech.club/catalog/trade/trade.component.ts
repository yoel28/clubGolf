import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {TradeModel} from "./trade.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {ActivatedRoute} from "@angular/router";

declare var SystemJS:any;
@Component({
    selector: 'trade',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class TradeComponent extends BaseViewInstance{


    public userId:string;

    constructor(public myglobal:globalService,private routeActive: ActivatedRoute) {
        super();
    }
    ngOnInit():void{
        super.ngOnInit();
        this.userId=this.routeActive.snapshot.params['userId'];

        if(this.userId){
            this.rest.where.push
            ({
                'or':[
                        {'op':'eq', 'value':parseFloat(this.userId), 'field':'s.id'},
                        {'op':'eq', 'value':parseFloat(this.userId), 'field':'g.id'}
                    ]
            });
        }
    }

    initModel() {
        this.model= new TradeModel(this.myglobal);

    }

    initViewOptions() {
        this.viewOptions["title"] = 'Lista';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la operación: ',
            'keyAction':'id'
        };
    }
}
