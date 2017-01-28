import {Component, OnInit} from '@angular/core';
import {RegisterFullModel} from "./registerFull.model";
import {RestController, IRest} from "../../../com.zippyttech.rest/restController";
import {FormControl} from "@angular/forms";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {UserComponent} from "../../../com.zippyttech.access/user/user.component";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'register-full',
    templateUrl:'index.html',
    styleUrls: ['style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class RegisterFullComponent extends RestController implements OnInit{
    public model:any;
    public viewOptions:any={};

    public user:any;
    public userObject:any={};
    public userObjectInstance:any;
    public vehicle:any=[];

    constructor(public db:DependenciesBase) {
        super(db);
    }

    ngOnInit(){
        this.initModel();
        this.initViewOptions();
    }
    public tempIdUser:string;
    getRestUser(){
        let data = this.userObjectInstance.getFormValues();
        let rest:IRest={
            where:[{'op':'eq','field':'id','value':data.id}],
            offset:0,
            max:0
        };
        if(this.tempIdUser && this.tempIdUser != data.id)
        {
            if(this.instanceUser){
                this.instanceUser.instanceBase.loadDataWhere('',rest.where);
            }
        }
        this.tempIdUser =  data.id;
        return rest;
    }

    public instanceUser:UserComponent;
    setInstanceUser(instance){
        if (this.instanceUser)
            instance.instanceBase = this.instanceUser.instanceBase
        this.instanceUser = instance;
    }
    prueba(event){ //TODO:Prueba para cambiar validadores
        if(event)
            event.preventDefault();
        (<FormControl>this.user.form.controls.email).setValidators(null);
        (<FormControl>this.user.form.controls.email).updateValueAndValidity();
    }

    initModel() {
        this.model= new RegisterFullModel(this.db);
        this.userObject['id']= (new UserModel(this.db)).ruleObject;
        this.userObject['id'].key='id';
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
        let data;
        if(this.userObjectInstance.form.valid)
            data = Object.assign({},this.userObjectInstance.getFormValues());
        else
            data = Object.assign({},this.user.getFormValues({'accountLocked':false}));
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
        let count=0;
        if( !(this.user && this.user.form && this.user.form.valid) && !(this.userObjectInstance && this.userObjectInstance.form && this.userObjectInstance.form.valid))
            return false;

        this.instanceVehicle.forEach(obj=>{
            if(obj && obj.form && !obj.form.valid){
                count ++;
                return;
            }
        });
        return count==0?true:false;
    }
}
