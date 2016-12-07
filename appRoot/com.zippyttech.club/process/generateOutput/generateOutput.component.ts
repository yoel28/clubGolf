import {Component, OnInit, AfterViewInit} from '@angular/core';
import {globalService} from "../../../com.zippyttech.utils/globalService";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
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
    }
    openQr(){
        var printContents = document.getElementById("reporte").innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<body>' + printContents + '</body>');
        popupWin.document.head.innerHTML = (document.head.innerHTML);
        popupWin.document.close();
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
