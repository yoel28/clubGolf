import {Router, ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {globalService} from "../com.zippyttech.utils/globalService";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {Injectable} from "@angular/core";
import {StaticValues} from "../com.zippyttech.utils/catalog/staticValues";
import {StaticFunction} from "../com.zippyttech.utils/catalog/staticFunction";
import {WebSocket} from "../com.zippyttech.utils/websocket";
import {QrReader} from "../com.zippyttech.ui/components/qrReader/qrReader.component";


@Injectable()
export class DependenciesBase {
    public debug=false;
    public msg = StaticValues.msg;
    public classCol=StaticFunction.classCol;
    public classOffset=StaticFunction.classOffset;
    public pathElements=StaticValues.pathElements;
    public qrReader:QrReader;

    constructor(
                public router: Router,
                public http:Http,
                public myglobal:globalService,
                public toastyService:ToastyService,
                public toastyConfig:ToastyConfig,
                public ws:WebSocket
    ){}

    public debugLog(log){
        if(this.debug)
            console.log(log);
    }

    public templateTypeOf(value){
        return typeof (value);
    }
}