import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {RestController} from "../com.zippyttech.rest/restController";
import {contentHeaders} from "../com.zippyttech.rest/headers";

@Injectable()
export class globalService extends RestController{
    user:any=[];
    params:any={};
    help:any={};
    rules:any={};
    permissions:any=[];
    init=false;

    status={
        'token':{'status':false,'title':'Validando usuario'},
        'user':{'status':false,'title':'Consultando datos del usuario'},
        'permissions':{'status':false,'title':'Consultando  permisos'},
        'params':{'status':false,'title':'Consultando  parametros'},
        'help':{'status':false,'title':'Consultando  ayudas'},
        'rules':{'status':false,'title':'Consultando  reglas'},
    };

    objectInstance:any={};//lista de instancias creadas
    
    constructor(public http:Http) {
        super(http);

        if (typeof(Storage) !== "undefined") {
            console.log("habemus localstorage")
        } else {
            console.log("no habemus localstorage")
        }

        if(localStorage.getItem('bearer')){
            this.initSession();
        }
    }
    initSession():void{
        this.initFinish(true);
        this.loadValidToken();
        this.loadMyPermissions();
        this.loadParams();
        this.loadTooltips();
        this.loadRules();
    }
    initFinish(reverse=false):void{
        if(reverse)
        {
            this.status.token.status=false;
            this.status.user.status=false;
            this.status.permissions.status=false;
            this.status.params.status=false;
            this.status.help.status=false;
            this.status.rules.status=false;
        }
        if(this.status.token.status && this.status.user.status  && this.status.permissions.status && this.status.params.status && this.status.help.status && this.status.rules.status)
            this.init=true;
    }
    error = (err:any):void => {
        if(localStorage.getItem('bearer')){
            this.initFinish(true);
            localStorage.removeItem('bearer');
            contentHeaders.delete('Authorization');
            window.location.reload();
        }
    }
    loadValidToken():void{
        let that=this;
        let successCallback=(response:any) => {
            Object.assign(that.user, response.json());
            that.status.token.status=true;
            that.initFinish();
            that.loadUser();
        };
        this.httputils.doGet('/validate',successCallback,this.error);
    }
    loadUser():void{
        let that = this;
        let successCallback= (response:any) => {
            Object.assign(that.user,that.user,response.json().list[0]);
            that.status.user.status=true;
            that.initFinish();
        };
        let where = encodeURI('[["op":"eq","field":"username","value":"'+this.user.username+'"]]');
        this.httputils.doGet('/users?where='+where, successCallback,this.error);
    };
    loadMyPermissions():any{
        let that = this;
        let successCallback= (response:any) => {
            Object.assign(that.permissions,response.json());
            that.status.permissions.status=true;
            that.initFinish();
        };
        return this.httputils.doGet('/current/permissions/',successCallback,this.error);
    }
    loadParams():void{
        let that = this;
        let successCallback= (response:any) => {
            Object.assign(that.params,response.json().list);
            that.status.params.status=true;
            that.initFinish();
        };
        this.httputils.doGet('/params?max=1000',successCallback,this.error);
    }
    loadRules():void{
        let that = this;
        let successCallback= (response:any) => {
            Object.assign(that.rules,response.json().list);
            that.status.rules.status=true;
            that.initFinish();
        };
        this.httputils.doGet('/rules?max=1000',successCallback,this.error);
    }
    loadTooltips():void{
        let that = this;
        let successCallback= (response:any) => {
            Object.assign(that.help,response.json().list);
            that.status.help.status=true;
            that.initFinish();
        };
        this.httputils.doGet('/infos?max=1000',successCallback,this.error);
    }
    existsPermission(keys:any):boolean{
        let index = this.permissions.findIndex((obj:any) => (keys.indexOf(obj.id) >= 0 || keys.indexOf(obj.code)>=0));
        if(index > -1)
            return true;
        return false;
    }


    getParams(key:string):string{
        let that = this;
        let valor="";
        Object.keys(this.params).forEach(index=>{
            if(that.params[index].key==key){
                valor=that.params[index].value;
                return;
            }
        })
        return valor;
    }

    getRule(key:string):string{
        let that = this;
        let valor="";
        Object.keys(this.rules).forEach(index=>{
            if(that.rules[index].key==key){
                valor=that.rules[index].value;
                return;
            }
        })
        return valor;
    }
    getTooltip(code:string):any{
        let that = this;
        let valor={};
        Object.keys(this.help).forEach(index=>{
            if(that.help[index].code==code){
                valor=that.help[index];
                return;
            }
        })
        return valor;
    }
    getKeys(data:any):any{
        return Object.keys(data);
    }
    
}