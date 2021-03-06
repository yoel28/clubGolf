import {Component, EventEmitter} from '@angular/core';
import {RestController} from "../../../com.zippyttech.rest/restController";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
declare var SystemJS:any;

export interface IModal{
    id:string
    global?:{
        size?:'modal-sm' | 'modal-md' | 'modal-lg';
    }
    header:{
        title:string;
        class?:string;
    }
    body?:{

    }
    footer?:Array<IAction>
}
interface IAction{
    title:string;
    icon?:string;
    class?:string;
    click:()=>any;
}

@Component({
    moduleId:module.id,
    selector: 'modal-view',
    templateUrl: 'index.html',
    styleUrls: [ 'style.css'],
    inputs:['params'],
    outputs:['getInstance'],
})
export class ModalComponent extends RestController{

    public params:IModal;
    public getInstance:any;
    public title='modal';

    constructor(public db:DependenciesBase) {
        super(db);
        this.getInstance = new EventEmitter();
    }
    ngOnInit(){
        this.getInstance.emit(this);
    }
}

