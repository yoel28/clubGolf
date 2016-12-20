import {Component, EventEmitter, OnInit, AfterViewInit} from "@angular/core";
import  {FormControl, Validators, FormGroup} from '@angular/forms';
import {Http} from "@angular/http";

import {RestController} from "../../../com.zippyttech.rest/restController";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticFunction} from "../../../com.zippyttech.utils/catalog/staticFunction";
import {ToastyService, ToastyConfig} from "ng2-toasty";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'form-view',
    templateUrl: 'index.html',
    styleUrls: [ 'style.css'],
    inputs:['params','rules','onlyRequired'],
    outputs:['save','getInstance','getForm'],
})
export class FormComponent extends RestController implements OnInit,AfterViewInit{

    public params:any={};
    public msg:any = StaticValues.msg;

    public rules:any={};
    public id:string;
    public dataSelect:any={};
    public dataListMultiple:any={};//arraay para opciones multiples

    public save:any;
    public getInstance:any;
    public getForm:any;

    public form:FormGroup;
    public data:any = {};
    public keys:any = {};

    public delete=false;
    public onlyRequired=false;

    public classCol=StaticFunction.classCol;
    public classOffset=StaticFunction.classOffset;

    constructor(public http:Http, public myglobal:globalService,public toastyService:ToastyService,public toastyConfig:ToastyConfig) {
        super(http,toastyService,toastyConfig);
        this.save = new EventEmitter();
        this.getInstance = new EventEmitter();
        this.getForm = new EventEmitter();
    }
    ngOnInit(){
        this.initForm();
    }
    ngAfterViewInit(){
        this.getInstance.emit(this);
        this.getForm.emit(this.form);
        if(this.params.prefix && !this.myglobal.objectInstance[this.params.prefix])
        {
            this.myglobal.objectInstance[this.params.prefix]={};
            this.myglobal.objectInstance[this.params.prefix]=this;
        }
    }

    initForm() {
        let that = this;
        Object.keys(this.rules).forEach((key)=> {
            if((that.onlyRequired && that.rules[key].required) || !that.onlyRequired){
                that.data[key] = [];
                let validators=[];
                if(that.rules[key].required)
                    validators.push(Validators.required);
                if(that.rules[key].maxLength)
                    validators.push(Validators.maxLength(that.rules[key].maxLength));
                if(that.rules[key].minLength)
                    validators.push(Validators.minLength(that.rules[key].minLength));
                if(that.rules[key].object)
                {
                    validators.push(
                        (c:FormControl)=> {
                            if(c.value && c.value.length > 0){
                                if(that.searchId[key]){
                                    if(that.searchId[key].detail == c.value)
                                        return null;
                                }
                                return {object: {valid: true}};
                            }
                            return null;
                        });
                }
                if(that.rules[key].email)
                {
                    validators.push(
                        (c:FormControl)=> {
                            if(c.value && c.value.length > 0) {
                                let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                                return EMAIL_REGEXP.test(c.value) ? null : {'email': {'valid': true}};
                            }
                            return null;
                        });
                }
                that.data[key] = new FormControl('',Validators.compose(validators));
                if(that.rules[key].value)
                    that.data[key].setValue(that.rules[key].value);


                if(that.rules[key].object)
                {
                    that.data[key].valueChanges.subscribe((value: string) => {
                        if(value && value.length > 0){
                            that.search=that.rules[key];
                            that.findControl = value;
                            that.dataList=[];
                            that.setEndpoint(that.rules[key].paramsSearch.endpoint+value);
                            if( !that.searchId[key]){
                                that.loadData();
                            }
                            else if(that.searchId[key].detail != value){
                                delete that.searchId[key];
                                that.loadData();
                            }
                            else{
                                this.findControl="";
                                that.search = [];
                            }
                        }
                    });
                }
            }

        });
        this.keys = Object.keys(this.data);
        this.form = new FormGroup(this.data);
    }

    public findControl:string="";

    submitForm(event){
        event.preventDefault();
        let that = this;
        let successCallback= response => {
            that.addToast('Notificacion','Guardado con éxito');
            that.resetForm();
            that.save.emit(response.json());
        };
        this.setEndpoint(this.params.endpoint);
        let body = this.form.value;

        Object.keys(body).forEach((key:string)=>{
            if(that.rules[key].object){
                body[key]=that.searchId[key]?(that.searchId[key].id||null): null;
            }
            if(that.rules[key].type == 'number' && body[key]!=""){
                body[key]=parseFloat(body[key]);
            }
            if(that.rules[key].type == 'boolean' && body[key]!=""){
                if(typeof body[key] === 'string')
                    body[key]=body[key]=='true'?true:false;
            }
            if(that.rules[key].prefix && that.rules[key].type=='text' && body[key]!="" && !that.rules[key].object)
            {
                body[key] = that.rules[key].prefix + body[key];
            }
            if(that.rules[key].setEqual){
                body[that.rules[key].setEqual] = body[key];
            }
            if(that.rules[key].type=='list'){
                body[key]=[];
                that.dataListMultiple[key].data.forEach(obj=>{
                    body[key].push(obj);
                });
            }
        });
        if(this.params.updateField)
            this.httputils.onUpdate(this.endpoint+this.id,JSON.stringify(body),this.dataSelect,this.error);
        else
            this.httputils.doPost(this.endpoint,JSON.stringify(body),successCallback,this.error);
    }
    //objecto del search actual
    public search:any={};
    //Lista de id search
    public searchId:any={};
    //Al hacer click en la lupa guarda los valores del objecto
    getLoadSearch(event,data){
        event.preventDefault();
        this.max=5;
        this.findControl="";
        this.search=data;
        this.getSearch(event,"");
    }
    //accion al dar click en el boton de buscar del formulario en el search
    getSearch(event,value){
        event.preventDefault();
        this.setEndpoint(this.search.paramsSearch.endpoint+value);
        this.loadData();
    }
    //accion al dar click en el boton de cerrar el formulario
    searchQuit(event){
        event.preventDefault();
        this.search={};
        this.dataList={};
    }
    //accion al seleccion un parametro del search
    getDataSearch(data){
        this.searchId[this.search.key]={'id':data.id,'title':data.title,'detail':data.detail};
        (<FormControl>this.form.controls[this.search.key]).setValue(data.detail);
        this.dataList=[];
    }
    //accion seleccionar un item de un select
    setValueSelect(data,key){
        (<FormControl>this.form.controls[key]).setValue(data);
        if(data=='-1')
            (<FormControl>this.form.controls[key]).setValue(null);
    }
    resetForm(){
        let that=this;
        this.search={};
        this.searchId={};
        this.dataListMultiple={};
        this.delete=false;
        this.params.updateField=false;
        Object.keys(this.data).forEach(key=>{
            (<FormControl>that.data[key]).setValue(null);
            (<FormControl>that.data[key]).setErrors(null);
            that.data[key]._pristine=true;
            if(that.rules[key].readOnly)
                that.rules[key].readOnly=false;
        })
    }
    loadDelete(event){
        this.setEndpoint(this.params.endpoint);
        this.onDelete(event,this.id);
    }
    refreshField(event,data){
        event.preventDefault();
        let that = this;
        if(data.refreshField.endpoint){
            let successCallback= response => {
                let val = response.json()[data.refreshField.field];
                that.data[data.key].setValue(val);
            }
            this.httputils.doGet(data.refreshField.endpoint,successCallback,this.error);
        }
        else{
            that.data[data.key].setValue(eval(data.refreshField.eval));
        }

    }
    makeTextRandon():string
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 20; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    setColor(data,key){
        this.data[key].setValue(data);
    }
    changeImage(data,key){
        (<FormControl>this.form.controls[key]).setValue(data);
    }

    setLoadDataModel(data,_delete=false)
    {
        let that = this;
        this.resetForm();
        if(data.id)
        {
            this.id = data.id;
            Object.keys(data).forEach(key=>{
                if(that.data[key])
                {
                    (<FormControl>that.form.controls[key]).setValue(data[key]);
                    that.data[key].setValue(data[key]);
                }
            })
            that.params.updateField=true;
            Object.assign(this.dataSelect,data);
        }
        this.delete = _delete;
    }
    public getKeys(data){
        return Object.keys(data || {});
    }
    loadDate(data,key){
        this.data[key].setValue(data.date);
    }
    addListMultiple(event,key){
        if(!this.dataListMultiple[key])
            this.dataListMultiple[key]={'view':false,'data':[]};
        this.dataListMultiple[key].data.push(this.form.controls[key].value);
        this.form.controls[key].setValue(null);
    }
    viewListMultiple(event,key){
        if(event)
            event.preventDefault();
        this.dataListMultiple[key].view=!this.dataListMultiple[key].view;
    }
    deleteListMultiple(event,key,data){
        if(event)
            event.preventDefault();
        let index = this.dataListMultiple[key].data.findIndex(obj => obj == data);
        if(index!=-1)
            this.dataListMultiple[key].data.splice(index,1);

    }
}
