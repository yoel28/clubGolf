import {Component} from '@angular/core';
import {GetbackModel} from "./getback.model";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {ProductModel} from "../../catalog/product/product.model";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'getback-product',
    templateUrl:'index.html',
    styleUrls: ['../style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class GetbackComponent extends ControllerBase {

    public step=1;
    public form:FormGroup;
    public listProduct:any={};
    public product:any;
    public msg=StaticValues.msg;

    public stateDefault=parseFloat(this.db.myglobal.getParams('TRADE_CODE_DEFAULT'));
    public byClientDefault=this.db.myglobal.getParams('TRADE_BYCLIENT_DEFAULT')=='true'?true:false;

    constructor(public db:DependenciesBase) {
        super('GETBACK','/getback/',db);

    }
    ngOnInit():void{
        super.ngOnInit();
        this.initForm();
        this.initViewOptions();
    }


    initModel() {
        this.model= new GetbackModel(this.db.myglobal);
        this.product = new ProductModel(this.db.myglobal);
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
                that.listProduct[code]={};
                that.listProduct[code].available=data.list[0].available;
                that.listProduct[code].id=data.list[0].id;
                that.listProduct[code].code=data.list[0].code;
                that.listProduct[code].title=data.list[0].productTypeTitle;
                that.listProduct[code].byClient=that.byClientDefault;
                that.listProduct[code].detail=null;
                that.listProduct[code].state=that.stateDefault;
                that.listProduct[code].mustComment=false;

                if(that.listProduct[code].available){
                    delete that.listProduct[code];
                    that.addToast('Error','Código '+code+' no a salido','warning',15000);
                }
            }
            else{
                delete that.listProduct[code];
                that.addToast('Error','Código '+code+' no registrado','error',15000);
            }

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
                                    if(c.value[key].state==null || (c.value[key].mustComment && !c.value[key].detail))
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
    changeClientDefault(){
        this.byClientDefault=!this.byClientDefault;
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
            if(field == 'state')
            {
                this.listProduct[key].mustComment=this.model.rules['state'].data[value].mustComment;
            }

            this.form.controls['data'].setValue(this.listProduct);
        }

    }

}
