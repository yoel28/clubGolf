import {Component, EventEmitter, OnInit, Input} from "@angular/core";
import {Http} from "@angular/http";
import {RestController} from "../../../com.zippyttech.rest/restController";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticFunction} from "../../../com.zippyttech.utils/catalog/staticFunction";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {ModelBase} from "../../../com.zippyttech.common/modelBase";

declare var SystemJS:any;
declare var moment:any;
@Component({
    moduleId: module.id,
    selector: 'list-action',
    templateUrl: 'template.html',
    styleUrls: ['style.css'],
    inputs:['params','model','dataList','where']
})
export class listAccionComponent extends ControllerBase
{
    constructor(public db:DependenciesBase)
    {
        super(db);
        this.setEndpoint(this.model.endpoint);
        this.prefix = this.model.prefix;
    }

    initModel(){
    }

}