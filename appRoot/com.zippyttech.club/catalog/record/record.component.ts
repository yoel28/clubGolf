import {Component} from '@angular/core';
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {RecordModel} from "./record.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {TagModel} from "../tag/tag.model";

declare var SystemJS:any;
@Component({
    selector: 'record-list',
    templateUrl:SystemJS.map.app+'/com.zippyttech.ui/view/base/base.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/view/base/style.css'],
})
export class RecordComponent extends BaseViewInstance{

    constructor(public db:DependenciesBase) {
        super();
    }

    initModel() {
        this.model= new RecordModel(this.db);

        this.model.rules['tags']=(new TagModel(this.db)).ruleObject;
        this.model.rules['tags'].search=false;
        this.model.rules['tags'].multiple=true;
        this.model.rules['tags'].permissions={};
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Registro de acceso';
    }

}