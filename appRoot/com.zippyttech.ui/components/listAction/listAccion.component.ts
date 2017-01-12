import {Component, EventEmitter, OnInit, Input} from "@angular/core";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
declare var moment:any;
@Component({
    moduleId: module.id,
    selector: 'list-action',
    templateUrl: 'template.html',
    styleUrls: ['style.css'],
    inputs:['model','actions']
})
export class listAccionComponent extends ControllerBase
{
    private tamElem:number;
    constructor(public db:DependenciesBase)
    {
        super(db);
        this.setEndpoint(this.model.endpoint);
        this.prefix = this.model.prefix;
    }

    initModel()
    {
        this.tamElem = 12/this.getKeysDataVisible().length;
    }

}