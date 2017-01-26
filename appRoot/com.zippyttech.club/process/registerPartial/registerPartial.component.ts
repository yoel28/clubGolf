import {Component, OnInit} from '@angular/core';
import {RegisterPartialModel} from "./registerPartial.model";
import {RestController} from "../../../com.zippyttech.rest/restController";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {FormComponent} from "../../../com.zippyttech.ui/components/form/form.component";

declare var SystemJS:any;


export interface registerData{
    vehicles:Object[];
    user:{};
    userDetail:{};
    contract:{};
    contractDetail:{};
}

interface IFunction{
    callback:(context:any,params?:{})=>void;
    icons?:string[];
    text?:string;
}

interface stepData{
    key?:string,
    requiredData?:boolean,
    title:string;
    model: any;
    form:{
        instances:FormComponent[],
        nForms:any[],
        functions?:IFunction[]
    };
    functions?:IFunction[];
}

@Component({
    moduleId:module.id,
    selector: 'register-partial',
    templateUrl:'template.html',
    styleUrls: ['style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade",200)
})
export class RegisterPartialComponent extends RestController implements OnInit
{
    public model:RegisterPartialModel;
    public viewOptions:any={};
    public registerSteps:[stepData];
    public currentStep:number = 0;
    public dataToSend:registerData;

    constructor(public db:DependenciesBase) {
        super(db);
        this.dataToSend = { vehicles:[], user:{}, userDetail:{}, contract:{}, contractDetail:{}};
    }

    initSteps(){
        this.registerSteps = [
            {
                title:"Vehiculos", key:"vehicles", model:this.model.vehicle,
                form:{
                        instances:[], nForms:[{}],
                        functions:[{callback:this.del,icons:["fa-times"]}]
                    },
                functions:[{callback:this.add, text:"Agregar",icons:["fa-car","fa-plus"]}]
            },
            {
                title:"Usuario", key:"user", model:this.model.userSearch,
                form:{instances:[], nForms:[{}]},
                functions:[{callback:this.newUser, icons:["fa-user-plus"], text:"Usuario nuevo"}]
            },
            {
                title:"Detalles", key:"userDetail", model:this.model.user, requiredData:true,
                form:{instances:[], nForms:[{}]}
            },
            {
                title:"Contrato", key:"contract", model:this.model.contractSearch,
                form:{instances:[], nForms:[{}]},
                functions:[{callback:this.newContract, icons:["fa-file-text","fa-plus"], text:"Contrato nuevo"}]
            },
            {
                title:"Contrato", key:"contractDetail", model:this.model.contract, requiredData:true,
                form:{instances:[], nForms:[{}]}
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

    public sendData(event){

    }

    nextStep(){
        //save current data
        if(this.registerSteps[this.currentStep].key) {
            if(this.dataToSend[this.registerSteps[this.currentStep].key] instanceof Array){
                this.dataToSend[this.registerSteps[this.currentStep].key]=[];
                for (let form of this.registerSteps[this.currentStep].form.instances)
                    this.dataToSend[this.registerSteps[this.currentStep].key].push(form.getFormValues());
            }
            else{
                Object.assign(this.dataToSend[this.registerSteps[this.currentStep].key],this.registerSteps[this.currentStep].form.instances[0].getFormValues());
            }
        }
        this.currentStep++;
        if(this.registerSteps[this.currentStep].key == "userDetail") {
            this.registerSteps[this.currentStep].model.dataList=undefined;
            this.registerSteps[this.currentStep].model.loadDataWhere(this.dataToSend.user["id"]);
        }else
            this.registerSteps[this.currentStep].model.dataList = {};
    }

    backStep(){
        this.currentStep--;
        // for(let form of this.registerSteps[this.currentStep].form.instances)
        // {
        //     this.registerSteps[this.currentStep].form.instances
        // }
    }

    public validForm():boolean{
        if(!this.registerSteps[this.currentStep].form.instances)
            return false;

        for(let form of this.registerSteps[this.currentStep].form.instances)
            if(!form.isValidForm())
                return false

        return true;
    }

    //CALLBACKS
    public newUser(context)
    {
        context.dataToSend.user['id'] = null;
        context.currentStep++;
    }
    public newContract(context)
    {
        context.dataToSend.contract['contractCode'] = null;
        context.currentStep++;
    }

    public add(context:any){
        context.registerSteps[context.currentStep].form.nForms.push({});
    }

    public del(context:any,params:any[]){
        context.registerSteps[context.currentStep].form.instances.splice(params['index'],1);
        context.registerSteps[context.currentStep].form.nForms.splice(params['index'],1);
    }


    public saveStepForm(form:FormComponent,i)
    {
        console.log(this.registerSteps[this.currentStep].model.dataList);

        if(this.registerSteps[this.currentStep].requiredData)
                form.setLoadDataModel(this.registerSteps[this.currentStep].model.dataList);

        this.registerSteps[this.currentStep].form.instances[i]=form;

        console.log(form);
        console.log(this.registerSteps[this.currentStep].form.instances[i]);
    }

}