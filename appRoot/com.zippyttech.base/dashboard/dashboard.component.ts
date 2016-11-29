import {Component, OnInit,AfterViewInit} from '@angular/core';
import {Http} from '@angular/http';
import {globalService} from "../../com.zippyttech.utils/globalService";

declare var SystemJS:any;

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl:'index.html',
    styleUrls: ['style.css'],
})
export class DashboardComponent implements OnInit,AfterViewInit{


    constructor(public myglobal:globalService,public http:Http) {}

    ngOnInit():void{}

    ngAfterViewInit():any {}

}


