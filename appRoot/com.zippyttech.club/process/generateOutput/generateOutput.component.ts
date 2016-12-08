import {Component, OnInit, AfterViewInit, HostListener} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
declare var QCodeDecoder:any;
@Component({
    moduleId:module.id,
    selector: 'generate-output',
    templateUrl:'index.html',
    styleUrls: ['style.css'],
})
export class GenerateOutputComponent implements OnInit,AfterViewInit{

    public instance:any={};
    public paramsTable:any={};
    public model:any;
    public viewOptions:any={};

    public pathElements=StaticValues.pathElements;

    public dataQr={
        'token':localStorage.getItem('bearer'),
        'channel':'operator'
    };

    constructor(public myglobal:globalService) {}

    ngOnInit(){
        this.initModel();
        this.initViewOptions();
        this.loadParamsTable();
    }

    ngAfterViewInit():any {
        this.instance = {
            'model':this.model,
            'viewOptions':this.viewOptions,
            'paramsTable':this.paramsTable
        };

        if (!(this.qr.isCanvasSupported() && this.qr.hasGetUserMedia())) {
            alert('Your browser doesn\'t match the required specs.');
            throw new Error('Canvas and getUserMedia are required');
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

    public qr = new QCodeDecoder();
    _stop(event)
    {
        if(event)
            event.preventDefault();
        this.qr.stop();
    }
    _start(event){
        if(event)
            event.preventDefault();
        this.qr.decodeFromCamera(document.querySelector('video'), this.resultHandler);
    }
    resultHandler (err, result) {
        if (err)
            return console.log(err.message);

        alert(result);
    }

    initModel() {

    }

    initViewOptions() {
        this.viewOptions["title"] = 'Generar salidas';
    }

    loadParamsTable(){
        this.paramsTable.actions={};
        this.paramsTable.actions.delete = {
            'message': '¿ Esta seguro de eliminar el producto: ',
            'keyAction':'code'
        };
    }
    public get getDataQr(){
        return JSON.stringify(this.dataQr);
    }
}
