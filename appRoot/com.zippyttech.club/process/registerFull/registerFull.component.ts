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

    public user:any;
    public vehicle:any=[];

    constructor(public http:Http,public toastyService:ToastyService,public toastyConfig:ToastyConfig,public myglobal:globalService) {
        super(http,toastyService,toastyConfig);
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
    public instanceVehicle=[];
    setForm(form,i){
        this.instanceVehicle[i] = form;
    }
    addVehicle(event){
        this.vehicle.push(null)
    }
    deleteForm(event,i){
        if(event)
            event.preventDefault();
        if(this.instanceVehicle[i])
            this.instanceVehicle[i]=null;
    }
    saveData(event){
        if(event)
            event.preventDefault();
        let that = this;
        let data = Object.assign({},this.user.getFormValues());
        data['vehicles']=[];
        this.instanceVehicle.forEach(obj=>{
            if(obj && obj.form){
                data['vehicles'].push(obj.getFormValues());
            }
        });
        let successCallback= response => {
            that.addToast('Notificacion','Guardado con éxito');
            that.resetForm();
        };
        this.httputils.doPost(this.model.endpoint,JSON.stringify(data),successCallback,this.error);
    }
    public dataOk:boolean=false;
    public resetForm(){
        this.user = {};
        this.vehicle = [];
        this.dataOk = true;
    }
    isValidForm():boolean{
        let valid=true;
        if(this.user && this.user.form)
            valid = this.user.form.valid;

        this.instanceVehicle.forEach(obj=>{
            if(obj && obj.form && !obj.form.valid){
                valid=false;
                return;
            }
        });
        return valid;
    }
}
