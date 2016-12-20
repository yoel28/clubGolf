import {Component, OnInit} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {BaseViewInstance} from "../../../com.zippyttech.ui/view/base/baseView.instance";
import {RegisterFullModel} from "./registerFull.model";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {StaticFunction} from "../../../com.zippyttech.utils/catalog/staticFunction";
import {RestController} from "../../../com.zippyttech.rest/restController";
import {Http} from "@angular/http";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {FormGroup, Validators, FormControl} from "@angular/forms";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'register-full',
    templateUrl:'index.html',
    styleUrls: ['style.css'],
})
export class RegisterFullComponent extends RestController implements OnInit{
    public model:any;
    public viewOptions:any={};

    public msg=StaticValues.msg;
    public classCol = StaticFunction.classCol;
    public classOffset = StaticFunction.classOffset;

    public formFull={'user':null,'vehicle':[]};

    constructor(public http:Http,public toastyService:ToastyService,public toastyConfig:ToastyConfig,public myglobal:globalService) {
        super(http,toastyService,toastyConfig)
    }

    ngOnInit(){
        this.initModel();
        this.initViewOptions();
    }

    initModel() {
        this.model= new RegisterFullModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Registro';
    }
    setForm(form,key,index=-1){
        if(index == -1)
            this.formFull[key] = form;
        if(index)
            this.formFull[key][index]['data'] = form;
    }
    addVehicle(event){
        this.formFull.vehicle.push({'id':this.formFull.vehicle.length,'data':null})

    }
}
