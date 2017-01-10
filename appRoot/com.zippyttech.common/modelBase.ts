import {globalService} from "../com.zippyttech.utils/globalService";
import {ModelRoot} from "./modelRoot";
import {AccountModel} from "../com.zippyttech.access/account/account.model";

export abstract class ModelBase extends ModelRoot{

    constructor(prefix,endpoint,public myglobal:globalService,useGlobal=true) {
        super(prefix,endpoint,myglobal,useGlobal);
        this.checkGlobal();
    }
    private checkGlobal(){
        if(this.permissions['global'])
        {
            let account = new AccountModel(this.myglobal);
            this.rules['account'] =  account.ruleObject;
            this.rules['account'].required = true;
        }
    }

}