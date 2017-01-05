import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {globalService} from "../com.zippyttech.utils/globalService";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {Injectable} from "@angular/core";
import {StaticValues} from "../com.zippyttech.utils/catalog/staticValues";
import {StaticFunction} from "../com.zippyttech.utils/catalog/staticFunction";

@Injectable()
export class DependenciesBase {
    public msg = StaticValues.msg;
    public classCol=StaticFunction.classCol;
    public classOffset=StaticFunction.classOffset;

    constructor(
                public router: Router,
                public http:Http,
                public myglobal:globalService,
                public toastyService:ToastyService,
                public toastyConfig:ToastyConfig
    ){}
}