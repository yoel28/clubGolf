import { Injectable } from '@angular/core';
import {globalService} from "./globalService";
import {FormControl} from "@angular/forms";


declare var SockJS:any;
declare var Stomp:any;

@Injectable()
export class WebSocket {

    public client:any;
    public forceClose=false;
    public status:FormControl;

    constructor(public myglobal:globalService){
        this.status = new FormControl(false);
    }

    onSocket(channel) {
        if (!this.myglobal.channelWebsocket[channel])
            this.myglobal.channelWebsocket[channel] = new FormControl(null);
        this.onConnect(channel);
    }
    onMessage(value){
        this.client.send("/app/message", {priority: 9}, value);
    }
    onConnect(channel){
        let that = this;
        let ws = new SockJS(localStorage.getItem('url') + "/stomp");
        this.client = Stomp.over(ws);
        that.client.connect({},
            function () {
                that.status.setValue(true);
                that.client.subscribe(channel, function (message) {
                    that.myglobal.channelWebsocket[channel].setValue(JSON.parse(message.body));
                });
            },
            function(error) {
                that.status.setValue(false);
                setTimeout(
                    function(){
                        if(!that.forceClose)
                            that.onConnect(channel);
                    }, 15000
                );
            }
        );
    }
}