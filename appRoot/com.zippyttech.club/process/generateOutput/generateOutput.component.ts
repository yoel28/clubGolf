import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {ProductModel} from "../../catalog/product/product.model";
import {QrcodeModel} from "../../catalog/qrcode/qrcode.model";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

declare var SystemJS:any;
declare var QCodeDecoder:any;
declare var moment:any;
declare var jQuery:any;

@Component({
    moduleId:module.id,
    selector: 'generate-output',
    templateUrl:'index.html',
    styleUrls: ['../style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class GenerateOutputComponent extends ControllerBase implements OnInit,OnDestroy {

    public instance:any={};

    public QRCam:any;

    public form:FormGroup;
    public subscribe:any;

    public step=1;
    public dataClient:any={};

    public product:any;
    public qr:QrcodeModel;
    public listProduct:any={};

    public dataQr={
        'token':localStorage.getItem('bearer'),
        'channel':'operator'
    };
    public channelWS:string;

    constructor(public db:DependenciesBase) {
        super(db);
        this.channelWS = '/'+this.dataQr.channel+'/'+this.dataQr.token;
    }
    public initModel(){
        this.product = new ProductModel(this.db);
        this.qr = new QrcodeModel(this.db);
    }

    ngOnInit(){
        super.ngOnInit();
        this.initForm();
        this.initViewOptions();
        this.loadWebSocket();
    }
    initForm(){
        this.form = new FormGroup({
            'code':new FormControl ("", Validators.required)
        })
    }
    initViewOptions() {
        this.viewOptions["title"] = 'Generar salidas';
    }
    loadWebSocket(){
        let that=this;
        this.db.ws.onSocket(this.channelWS);
        if(this.db.ws.webSocket[this.channelWS].data)
        {
            this.subscribe = this.db.ws.webSocket[this.channelWS].data.valueChanges.subscribe(
                (value:any) => {
                    if(value.id){
                        that.listProduct={};
                        that.dataClient = Object.assign({},value);
                        that.step=2;
                        that.closeQR();
                    }
                }
            );
        }
    }

    openQR(event){
        if(event)
            event.preventDefault();
        var contents = document.getElementById("myqr").innerHTML;
        if(!this.db.myglobal.qrPublic || (this.db.myglobal.qrPublic && !this.db.myglobal.qrPublic.window)){
            this.db.myglobal.qrPublic = window.open('', '_blank');
            this.db.myglobal.qrPublic.document.open();
        }
        if(this.db.myglobal.qrPublic.document.body)
            this.db.myglobal.qrPublic.document.body.innerHTML = '';
        this.db.myglobal.qrPublic.document.write('<body>' + contents + '</body>');
        this.db.myglobal.qrPublic.document.head.innerHTML = (document.head.innerHTML);
    }
    closeQR(event?){
        if(event)
            event.preventDefault();
        if(this.db.myglobal.qrPublic && this.db.myglobal.qrPublic.window) {
            this.db.myglobal.qrPublic.document.body.innerHTML = '';
            this.db.myglobal.qrPublic.document.write('<body>Por favor espere</body>');
            this.db.myglobal.qrPublic.document.head.innerHTML = (document.head.innerHTML);
        }
    }

    openCam(event){
        if(event)
            event.preventDefault();

        this.QRCam = new QCodeDecoder();
        if (!(this.QRCam.isCanvasSupported() && this.QRCam.hasGetUserMedia())) {
            alert('Your browser doesn\'t match the required specs.');
            throw new Error('Canvas and getUserMedia are required');
        }

        this.QRCam.decodeFromCamera(document.querySelector('video'), this.resultHandler);
    }
    resultHandler (err, result) {
        if (err)
            return console.log(err.message);
        alert(result);
    }

    loadProduct(event){
        let that=this;
        let code=this.form.controls['code'].value;
        this.form.controls['code'].setValue(null);

        if(event)
            event.preventDefault();

        let where=[{'op':'eq','field':'code','value':code}];
        this.listProduct[code]={'wait':true};
        this.product.loadDataWhere('',where).then(
            response => {
                if(that.product.dataList && that.product.dataList.count==1)
                {
                    that.listProduct[code]=that.product.dataList.list[0];
                    if(!that.listProduct[code].available){
                        delete that.listProduct[code];
                        that.addToast('Error','El codigo '+code+' no esta disponible','warning',15000);
                    }
                }
                else{
                    delete that.listProduct[code];
                    that.addToast('Error','Código '+code+' no registrado','error',15000);
                }

            }
        );
    }
    disableSubmit(){
        return Object.keys(this.listProduct).length>0?false:true;
    }
    public get getDataQr(){
        return JSON.stringify(this.dataQr);
    }
    deleteKeyProduc(key){
        if(this.listProduct[key])
            delete this.listProduct[key];
    }
    saveProduct(event){
        let that=this;
        if(event)
            event.preventDefault();
        let body={'qrCode':null,'list':[]};
        body.qrCode =  this.dataClient.id;
        Object.keys(this.listProduct).forEach(key=>{
            if(that.listProduct[key].id)
                body.list.push(that.listProduct[key].id)
        })
        this.httputils.onSave('/trades',JSON.stringify(body),null).then(response=>{
            that.step=3;
        })

    }
    ngOnDestroy():void{
        this.db.ws.closeWebsocket(this.channelWS);
        if(this.subscribe)
            this.subscribe.unsubscribe();
        this.subscribe=null;
    }
    reconectWS(event){
        if(event)
            event.preventDefault();
        this.db.ws.onSocket(this.channelWS);
    }
    searchQr(event){
        if(event)
            event.preventDefault();
        try {
            let that=this;
            let val = jQuery('#validQr').val();
            val = val.replace(/'/g, '"');
            jQuery('#validQr').val('');
            let data = JSON.parse(val);
            let where=[{join:"sponsor", where:[{'op':'eq','field':'contractCode','value':data.sponsorContract}]}];

            this.qr.loadDataWhere(data.id,where).then(
                response => {
                    that.db.ws.webSocket[that.channelWS].data.setValue(response);
                }
            )


        }catch (e){
            this.addToast('Error','QR invalido','error');
        }



    }

}
