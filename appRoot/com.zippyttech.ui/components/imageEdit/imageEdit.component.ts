import {Component, EventEmitter, AfterContentInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";

declare var SystemJS:any;
var moment = require('moment');
var jQuery = require('jquery');

@Component({
    moduleId:module.id,
    selector: 'image-edit-view',
    templateUrl: 'index.html',
    styleUrls: [ 'style.css'],
    inputs:['params','image','default','edit','type'],
    outputs:['out','getInstance']
})
export class ImageEditComponent implements AfterContentInit{
    @ViewChild('input') input:ElementRef;
    @ViewChild('name') name:ElementRef;
    @ViewChild('size') size:ElementRef;
    @ViewChild('inlineview') inlineview:ElementRef;

    public configId=moment().valueOf();
    public out:any;
    public getInstance:any;
    public pathElements=StaticValues.pathElements;
    public edit:boolean = true;
    public type:string = 'block';
    public params:any={};

    public image:string="";
    public default:string="";

    constructor() {
        this.out = new EventEmitter();
        this.getInstance = new EventEmitter();
    }

    ngAfterContentInit(){
        let f1 = document.querySelector('.file-input');
        if(f1)
            f1.classList.add("btn-i");
        this.getInstance.emit(this);
    }
    saveImage(event){
        this.out.emit(this.image);
    }
    changeImage(image=null){
        this.image=image;
    }

    changeFilePath(event){
        let file = event.srcElement.files[0];
        let kbsize = file.size/1024;
        let limit = 200;
        if(kbsize < limit){
            let reader: FileReader = new FileReader();
            reader.onloadend = (e) => {
                this.image = reader.result;
                this.out.emit(this.image);
            };
            reader.readAsDataURL(file);
            this.name.nativeElement.textContent = file.name;
            this.size.nativeElement.textContent = kbsize.toFixed(2)+'KB';
            this.inlineview.nativeElement.classList.remove('invalid');
            this.inlineview.nativeElement.classList.add('valid');
        }
        else{
            this.image = null;
            this.name.nativeElement.textContent = 'Archivo invalido';
            this.size.nativeElement.textContent = 'Ingrese una imagen menor a '+limit+'KB';
            this.inlineview.nativeElement.classList.remove('valid');
            this.inlineview.nativeElement.classList.add('invalid');
        }
    }

    clear(){
        this.image = null;
        this.name.nativeElement.textContent = '';
        this.size.nativeElement.textContent = '';
        this.inlineview.nativeElement.classList.remove('valid');
        this.inlineview.nativeElement.classList.remove('invalid');
        this.input.nativeElement.value = '';
        this.out.emit(this.image);
    }
}