import {Component, OnInit} from '@angular/core';
import {RegisterPartialModel, registerData} from "./registerPartial.model";
import {RestController, IRest} from "../../../com.zippyttech.rest/restController";
import {FormControl, FormGroup} from "@angular/forms";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;

interface stepData{
    title:string;
    form:{
        model: any,
        search?:boolean | false;
        headInstance?:{};
        isMultiple?:boolean | false;
        instance:FormGroup | FormGroup[],
        nForms:any[],
    };
}

@Component({
    moduleId:module.id,
    selector: 'register-partial',
    templateUrl:'template.html',
    styleUrls: ['style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class RegisterPartialComponent extends RestController implements OnInit
{
    public model:RegisterPartialModel;
    public viewOptions:any={};
    public registerSteps:[stepData];
    public currentStep:number;
    public contractFrom:FormGroup;
    public userForm:FormGroup;
    public vehicleForms:FormGroup[]=[];

    public dataOk:boolean=false;


    constructor(public db:DependenciesBase) {
        super(db);
    }

    initSteps() {
        this.currentStep = 0;
        this.registerSteps = [
            {
                title:"Vehiculos",
                form:{model:this.model.vehicle, instance:this.vehicleForms,nForms:[{}],isMultiple:true}
            },
            {
                title:"Usuario",
                form:{model:this.model.user, instance:this.userForm,nForms:[{}], headInstance:{},search:true}
            },
            {
                title:"Contrato",
                form:{model:this.model.contract, instance:this.contractFrom,nForms:[{}], headInstance:{},search:true}
            }
            ];
    }

    ngOnInit(){
        super.ngOnInit();
        this.initModel();
        this.initViewOptions();
        this.initSteps();
    }

    initModel() {
        this.model= new RegisterPartialModel(this.db);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Formulario de Registro';
    }

    add(){
       this.registerSteps[this.currentStep].form.nForms.push({});
    }

    deleteForm(event,i){
        if(event)
            event.preventDefault();

    }

    public sendData(event){

    }

    nextStep(){
        if(true)
            this.currentStep++;
    }

    backStep(){
        this.currentStep--;
    }

    saveInstance(event)
    {

    }
}