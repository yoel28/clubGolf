import { Injectable } from '@angular/core';
import {globalService} from "./globalService";
import {FormControl} from "@angular/forms";


declare var SockJS:any;
declare var Stomp:any;

@Injectable()
export class WebSocket {

    public client:any;
    constructor(public myglobal:globalService){}

    onSocket(channel) {
        let that = this;
        let ws = new SockJS(localStorage.getItem('url') + "/stomp");
        if (!that.myglobal.channelWebsocket[channel])
            that.myglobal.channelWebsocket[channel] = new FormControl(null);
        that.client = Stomp.over(ws);
        that.client.connect({}, function () {
            that.client.subscribe(channel, function (message) {
                that.myglobal.channelWebsocket[channel].setValue(JSON.parse(message.body));
            });
        });
    }
    onMessage(value){
        this.client.send("/app/message", {priority: 9}, value);
    }
}