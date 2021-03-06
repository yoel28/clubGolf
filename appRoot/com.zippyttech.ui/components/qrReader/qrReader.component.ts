import {Component, ViewChild, ElementRef, OnInit, EventEmitter, AfterContentInit, AfterViewInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {QrcodeModel} from "../../../com.zippyttech.club/catalog/qrcode/qrcode.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModal} from "../modal/modal.component";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";

const jQuery = require('jquery');
@Component({
    moduleId: module.id,
    selector: 'qr-reader',
    templateUrl: 'template.html',
    styleUrls: ['style.css'],
    outputs: ['getInstance']
})
export class QrReader extends ControllerBase implements OnInit, AfterViewInit{
    @ViewChild('form') form:ElementRef;
    @ViewChild('message') message:ElementRef;
    @ViewChild('input') input:ElementRef;

    public model: QrcodeModel;
    private isOpen:boolean = false;

    public qrString:string = '';
    public qrHidden: boolean = true;
    public guestRemove:FormControl;
    private qrModal:IModal;
    public processing:boolean = false;
    public submitTime:number;

    private _errorAudio = new Audio();

    constructor(public db:DependenciesBase){
        super(db);
        this.guestRemove = new FormControl();
        this.qrModal = {
            id:'qr-modal',
            global:{ size:'modal-md' },
            header:{
                title:'',
                class:'bg-green-club'
            },
            footer:[
                {   title:'procesar',icon:'fa fa-send', class:'btn btn-green',
                    click:()=>{
                        this.loadAttendings(null);
                        this.processing = true;
                    }
                }
            ]
        }
        this.db.qrReader = this;
    }


    initModel() {
        //TODO: Check that exist the qr model on model service and use it from service
        this.model = new QrcodeModel(this.db);
        let val = ['dateCreated','timeLimit','guest','sponsor','priceLimit','visit'];
        let rule={};
        val.forEach(key=>{
            rule[key]=this.model.rules[key];
        });
        this.model.rules = Object.assign({},rule);

    }
    ngOnInit(){
        this.initModel();
        this._errorAudio.src = "assets/audio/ERROR.mp3";
        let paramtime = this.db.myglobal.getParams('QR_SUBMIT');
        if(paramtime != '')
            this.submitTime = parseFloat(paramtime);
        else
            this.submitTime = -1;
    }

    toggleQr(){
        this.qrHidden = !this.qrHidden;
    }

    loadAttendings(event){
        if(event) event.preventDefault();
        let callback = (response=>this.guestRemove.setValue(this.model.dataList.id));
        this.model.httputils.doPost('/attendings/',this.qrString,callback,this.model.error);
        this.model.dataList = {};
    }

    open(event){
        if(event) event.preventDefault();
        if(this.isOpen) return;
        this.input.nativeElement.focus();
        this.form.nativeElement.classList.add('in');
         setTimeout(()=>{
             this.isOpen = true;
             this.form.nativeElement.classList.remove('in');
         }, 1300);
    }

    compress(event){
         event.preventDefault();
         if(!this.isOpen) return;
             //input.val('');
             this.form.nativeElement.classList.add('compressed');
             this.isOpen = false;

             setTimeout(()=>{
                 this.form.nativeElement.classList.remove('compressed');
             }, 1300);
    }

    submitQr(event){
        if(event) event.preventDefault();

        this.qrString = (this.input.nativeElement.value.replace(/'|”|“/g,'"')).replace(/[^a-zA-Z 0-9:,"\{\}]+/g,'');

        this.input.nativeElement.value = '';
        try {
            let data = JSON.parse(this.qrString);
            let where=[
               // {'op':'eq','field':'attended', 'value':false},
                {join:"sponsor", where:(data.sponsorContract)
                    ?[{'op':'eq', 'field':'contractCode', 'value':data.sponsorContract}]
                    :[{'op':'isNull','field':'contractCode'}] }
            ];
            this.model.dataList={};
            this.showMessage('Consultando...<span><i class="fa fa-refresh fa-spin"></iclas></span>');
            let endpoint = this.model.endpoint+data.id+'?offset=0'+this.model.setWhere(where);

            let successCallback = response=>{
                this.model.rest.findData=false;
                Object.assign(this.model.dataList, response.json());
                if(!(data.id && data.id==''))
                    this.model.loadPager(this.model.dataList);
                this.showMessage('El QR es valido!');
                let val = response.json();
                let title ="";
                if(val['guestName'])
                    title = val['guestName']+' '+(val['guestIdCard'] || '')+' | ';

                this.qrModal.header.title = title+val['sponsorName'] ;
                this.processing=true;

                if(this.submitTime != -1){
                    if (this.submitTime != 0)
                        jQuery('#qr-modal').modal('show');

                    setTimeout((t) => {
                        jQuery('#qr-modal').modal('hide');
                        this.loadAttendings(null);
                    }, this.submitTime);
                }
                else jQuery('#qr-modal').modal('show');
            };
            let error = err=>{
                this.model.error(err);
                this._errorAudio.play();
            };
            this.model.dataList={};
            this.model.httputils.doGet(endpoint,successCallback,error);
        }catch (e){
            this._errorAudio.play();
            this.showMessage('Formato de QR invalido!');//TODO:Change!, use data validation
            this.model.addToast('QR','Formato de QR invalido!','error');
        }
    }

    showMessage(msg:string){
        setTimeout(()=>this.message.nativeElement.innerHTML = msg , 0);
        this.form.nativeElement.classList.add('explode');
        this.message.nativeElement.classList.add('show');
        setTimeout(()=>{
            this.form.nativeElement.classList.remove('explode');
            this.message.nativeElement.classList.remove('show');
            this.message.nativeElement.innerHTML = '';
        }, 1500);
    }

    ngAfterViewInit(){
        this.open(null);
        jQuery('#qr-modal').on('hidden.bs.modal', ()=>{
            this.input.nativeElement.focus();
        });
    }
}