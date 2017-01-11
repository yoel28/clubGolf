import {Component} from '@angular/core';
import {TradeModel} from "./trade.model";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    selector: 'trade',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class TradeComponent extends BaseViewInstance{


    public userId:string;

    constructor(public db:DependenciesBase) {
        super();
    }
    ngOnInit():void{
        super.ngOnInit();
        this.userId=this.db.routeActive.snapshot.params['userId'];

        if(this.userId){
            this.rest.where.push
            ({
                'or':[
                        {'op':'eq', 'value':parseFloat(this.userId), 'field':'sponsor.id'},
                        {'op':'eq', 'value':parseFloat(this.userId), 'field':'guest.id'}
                    ]
            });
        }
    }

    initModel() {
        this.model= new TradeModel(this.db);

    }

    initViewOptions() {
        this.viewOptions["title"] = 'Lista de operaciones';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar la operación: ',
            'keyAction':'id'
        };
    }
}
