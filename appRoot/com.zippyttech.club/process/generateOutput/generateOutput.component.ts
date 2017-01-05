import {Component, OnInit, OnDestroy} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {WebSocket} from "../../../com.zippyttech.utils/websocket";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {ProductModel} from "../../catalog/product/product.model";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {QrcodeModel} from "../../catalog/qrcode/qrcode.model";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";

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

    public pathElements=StaticValues.pathElements;

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

    constructor(public myglobal:globalService,public ws:WebSocket,public router:Router,public http:Http,public toastyService:ToastyService,public toastyConfig:ToastyConfig) {
        super('NA','',router,http,myglobal,toastyService,toastyConfig);
        this.channelWS = '/'+this.dataQr.channel+'/'+this.dataQr.token;
    }
    public initModel(){
        this.product = new ProductModel(this.myglobal);
        this.qr = new QrcodeModel(this.myglobal);
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
        this.ws.onSocket(this.channelWS);
        if(this.ws.webSocket[this.channelWS].data)
        {
            this.subscribe = this.ws.webSocket[this.channelWS].data.valueChanges.subscribe(
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
        if(!this.myglobal.qrPublic || (this.myglobal.qrPublic && !this.myglobal.qrPublic.window)){
            this.myglobal.qrPublic = window.open('', '_blank');
            this.myglobal.qrPublic.document.open();
        }
        if(this.myglobal.qrPublic.document.body)
            this.myglobal.qrPublic.document.body.innerHTML = '';
        this.myglobal.qrPublic.document.write('<body>' + contents + '</body>');
        this.myglobal.qrPublic.document.head.innerHTML = (document.head.innerHTML);
    }
    closeQR(event?){
        if(event)
            event.preventDefault();
        if(this.myglobal.qrPublic && this.myglobal.qrPublic.window) {
            this.myglobal.qrPublic.document.body.innerHTML = '';
            this.myglobal.qrPublic.document.write('<body>Por favor espere</body>');
            this.myglobal.qrPublic.document.head.innerHTML = (document.head.innerHTML);
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
        let successCallback= response => {
            let data=response.json();
            if(data.count==1)
            {
                that.listProduct[code]=data.list[0];
                if(!that.listProduct[code].available){
                    delete that.listProduct[code];
                    that.addToast('Error','El codigo '+code+' no esta disponible','warning',15000);
                }
            }
            else{
                delete that.listProduct[code];
                that.addToast('Error','Código '+code+' no registrado','error',15000);
            }

        };
        let where=[{'op':'eq','field':'code','value':code}];
        this.listProduct[code]={'wait':true};
        this.product.loadDataModelWhere(successCallback,where);
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
        this.ws.closeWebsocket(this.channelWS);
        if(this.subscribe)
            this.subscribe.unsubscribe();
        this.subscribe=null;
    }
    reconectWS(event){
        if(event)
            event.preventDefault();
        this.ws.onSocket(this.channelWS);
    }
    searchQr(event){
        if(event)
            event.preventDefault();
        try {
            let that=this;
            let val = jQuery('#validQr').val();//TODO:exp Reg replac '
            val = val.replace(/'/g, '"');
            jQuery('#validQr').val('');
            let data = JSON.parse(val);
            let where=[{join:"sponsor", where:[{'op':'eq','field':'contractCode','value':data.sponsorContract}]}];

            let successCallback = response => {
                that.ws.webSocket[that.channelWS].data.setValue(response.json());
            };
            this.qr.loadDataModelWhere(successCallback,where,data.id)


        }catch (e){
            this.addToast('Error','QR invalido','error');
        }



    }

}
