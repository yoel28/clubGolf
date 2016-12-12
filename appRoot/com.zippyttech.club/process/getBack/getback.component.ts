import {Component} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {GetbackModel} from "./getback.model";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {ProductModel} from "../../catalog/product/product.model";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'getback-product',
    templateUrl:'index.html',
    styleUrls: ['../style.css'],
})
export class GetbackComponent extends ControllerBase {

    public step=1;
    public form:FormGroup;
    public listProduct:any={};
    public product:any;
    public msg=StaticValues.msg;

    constructor(public router: Router, public http:Http, public myglobal:globalService) {
        super('GETBACK','/getback/',router,http,myglobal);

    }
    ngOnInit():void{
        super.ngOnInit();
        this.initForm();
        this.initViewOptions();
    }


    initModel() {
        this.model= new GetbackModel(this.myglobal);
        this.product = new ProductModel(this.myglobal);
    }

    initViewOptions() {
        this.viewOptions["title"] = 'Devolver producto';
    }

    loadProduct(event){
        let that=this;
        let code=this.form.controls['code'].value;
        this.form.controls['code'].setValue(null);

        if(that.listProduct[code])
            return;

        if(event)
            event.preventDefault();

        let successCallback= response => {
            let data=response.json();
            if(data.count==1){
                that.listProduct[code]=data.list[0];
                that.listProduct[code].byClient=false;
                that.listProduct[code].detail=null;
                that.listProduct[code].state=null;
            }
            else
                that.listProduct[code]={'error':'Codigo no registrado'};

            that.form.controls['data'].setValue(that.listProduct);
        };
        let where=[{'op':'eq','field':'code','value':code}];
        this.listProduct[code]={'wait':true};
        this.form.controls['data'].setValue(this.listProduct);

        this.product.loadDataModelWhere(successCallback,where);
    }
    deleteKeyProduc(key){
        if(this.listProduct[key])
        {
            delete this.listProduct[key];
            this.form.controls['data'].setValue(this.listProduct);
        }
    }
    initForm(){
        let that=this;
        this.form = new FormGroup({
            'code':new FormControl (""),
            'data':new FormControl (null,Validators.compose([
                (c:FormControl)=> {
                    if(c.value){
                        let prodV=0;
                        Object.keys(c.value).forEach(key=>{
                            if(c.value[key].id){
                                if(!c.value[key].available){
                                    prodV++;
                                    if(c.value[key].state==null)
                                    {
                                        prodV=0;
                                        return;
                                    }

                                }
                            }
                        })
                        if(prodV>0)
                        {return null;}
                    }
                    return {object: {valid: false}};
                }
            ]))
        })
    }
    changeClient(code){
        if(this.listProduct[code])
        {
            this.listProduct[code].byClient=!this.listProduct[code].byClient;
            this.form.controls['data'].setValue(this.listProduct);
        }

    }
    saveProduct(event){
        event.preventDefault();
        let body={'list':[]};
        let that=this;
        Object.keys(this.listProduct).forEach(key=>{
            if(!that.listProduct[key].available)
                body.list.push({
                    'code':key,
                    'byClient':that.listProduct[key].byClient,
                    'detail':that.listProduct[key].detail,
                    'state':parseFloat(that.listProduct[key].state)
                })
        });
        this.onSave(body).then(
            response=>{
                that.step=2;
                that.listProduct={};
                that.listProduct={};
                that.form.controls['data'].setValue(this.listProduct);
            }
        );

    }
    setValues(key,field,value){
        if(this.listProduct[key])
        {
            this.listProduct[key][field]=value;
            this.form.controls['data'].setValue(this.listProduct);
        }

    }

}
