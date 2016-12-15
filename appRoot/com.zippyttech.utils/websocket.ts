import {Injectable, OnDestroy} from '@angular/core';
import {globalService} from "./globalService";
import {FormControl} from "@angular/forms";


declare var SockJS:any;
declare var Stomp:any;

@Injectable()
export class WebSocket implements OnDestroy{
    /*
    * this.ws.client.ws.readyState
    * 0= Nada
    * 1= Conectado
    * 3= Desconectado
    * */

    public client:any;
    public status:FormControl;
    public threat:any;

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
        try {
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
                    that.threat=setTimeout(
                        function(){
                            that.onConnect(channel);
                        }, 15000
                    );
                }
            );
        }catch (e){
            console.log('revento')
        }

    }
    ngOnDestroy(){
        console.log('rrere');
    }
}