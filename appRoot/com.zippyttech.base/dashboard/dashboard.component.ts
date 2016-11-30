import {Component, OnInit,AfterViewInit} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;

@Component({
    selector: 'dashboard',
    templateUrl: SystemJS.map.app+'com.zippyttech.base/dashboard/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.base/dashboard/style.css']
})
export class DashboardComponent implements OnInit,AfterViewInit{


    constructor(public myglobal:globalService,public http:Http) {}

    ngOnInit():void{}

    ngAfterViewInit():any {}

}


