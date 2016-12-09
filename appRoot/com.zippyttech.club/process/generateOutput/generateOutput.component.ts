import {Component, OnInit, AfterViewInit} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {WebSocket} from "../../../com.zippyttech.utils/websocket";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {ProductModel} from "../../catalog/product/product.model";

declare var SystemJS:any;
declare var QCodeDecoder:any;
declare var moment:any;
@Component({
    moduleId:module.id,
    selector: 'generate-output',
    templateUrl:'index.html',
    styleUrls: ['style.css'],
})
export class GenerateOutputComponent extends ControllerBase implements OnInit {

    public instance:any={};

    public pathElements=StaticValues.pathElements;

    public QRCam:any;

    public form:FormGroup;
    public subscribe:any;

    public step=1;
    public dataClient:any={};

    public product:any;
    public listProduct:any={};

    public dataQr={
        'token':localStorage.getItem('bearer'),
        'channel':'operator'
    };

    constructor(public myglobal:globalService,public ws:WebSocket,public router:Router,public http:Http) {
        super('NA','',router,http,myglobal);
    }
    public initModel(){
        this.product = new ProductModel(this.myglobal);
    }

    ngOnInit(){
        this.initForm();
        this.initModel();
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
        let channel = '/'+this.dataQr.channel+'/'+this.dataQr.token;
        this.ws.onSocket(channel);
        if(this.myglobal.channelWebsocket[channel])
        {
            this.subscribe = this.myglobal.channelWebsocket[channel].valueChanges.subscribe(
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
                that.listProduct[code]=data.list[0];
            else
                that.listProduct[code]={'error':'Codigo no registrado'};
        };
        let where=[{'op':'eq','field':'code','value':code}];
        this.listProduct[code]={'wait':true};
        this.product.loadDataModelWhere(successCallback,where);


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

}
