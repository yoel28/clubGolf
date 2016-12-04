import {Component, OnInit} from '@angular/core';
import {globalService} from "../../com.zippyttech.utils/globalService";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

declare var SystemJS:any;

@Component({
    selector: 'load-page',
    templateUrl: SystemJS.map.app+'com.zippyttech.base/load/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.base/load/style.css']
})
export class LoadComponent implements OnInit{

    constructor(public router: Router,public myglobal:globalService) {}
    ngOnInit():void{
        let that=this;
        this.myglobal.dataSesion.valueChanges.subscribe(
            (value:string) => {
                if(that.myglobal.dataSesion.valid)
                {
                    let link = [ that.myglobal.saveUrl || '/dashboard', {}];
                    that.myglobal.saveUrl=null;
                    that.router.navigate(link);
                }
            }
        );
        if(localStorage.getItem('bearer')){
            this.myglobal.initSession();
        }
    }

}


