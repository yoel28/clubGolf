import {Http} from '@angular/http';
import {contentHeaders} from './headers';

export class HttpUtils {
    public toastr:any;

    constructor(public http:Http) {
    }

    createEndpoint(endpoint:string,isAbosulte=false){
        return (isAbosulte?'':localStorage.getItem('urlAPI')) + endpoint;
    }

    doGet(endpoint:string, successCallback, errorCallback ,isEndpointAbsolute = false) {
        let that = this;
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.get(endpoint, {headers: contentHeaders})
                .subscribe(
                    response => {
                        localStorage.setItem('VERSION_CACHE_HEADER',response.headers.get('Cookie'));
                        that.valideVersion();
                        if (successCallback != null)
                            successCallback(response);
                        resolve(response.json());
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error);
                        reject(error);
                    }
                )
        });
    }

    doDelete(endpoint:string, successCallback, errorCallback,isEndpointAbsolute = false) {
        let that = this;
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.delete(endpoint, {headers: contentHeaders})
                .subscribe(
                    response => {
                        localStorage.setItem('VERSION_CACHE_HEADER',response.headers.get('Cookie'));
                        that.valideVersion();
                        if (successCallback != null)
                            successCallback(response);
                        resolve(response);
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error);
                        reject(error);
                    }
                )
        });
    }

    doPost(endpoint:string,body, successCallback, errorCallback,isEndpointAbsolute = false) {
        let that = this;
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.post(endpoint,body, {headers: contentHeaders})
                .subscribe(
                    response => {
                        try
                        {
                            localStorage.setItem('VERSION_CACHE_HEADER',response.headers.get('Cookie'));
                            that.valideVersion();
                            if (successCallback != null)
                                successCallback(response);
                            resolve(response.json());
                        }
                        catch(e)
                        {
                            resolve({});
                        }
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error);
                        reject(error);
                    }
                )
        });
    }
    doPut(endpoint:string,body, successCallback, errorCallback,isEndpointAbsolute = false) {
        let that = this;
        endpoint=this.createEndpoint(endpoint,isEndpointAbsolute);
        return new Promise<any>((resolve, reject) => {
            this.http.put(endpoint,body, {headers: contentHeaders})
                .subscribe(
                    response => {
                        localStorage.setItem('VERSION_CACHE_HEADER',response.headers.get('Cookie'));
                        that.valideVersion();
                        if (successCallback != null)
                            successCallback(response);
                        resolve(response.json());
                    },
                    error => {
                        if (errorCallback != null)
                            errorCallback(error);
                        reject(error);
                    }
                )
        });
    }

    onSave(endpoint:string, body,list, errorCallback = null,isEndpointAbsolute = false) {
        let that = this;
        let successCallback= response => {
            if(list != null)
                list.unshift( response.json());
            if(that.toastr)
                that.toastr.success('Guardado con éxito','Notificación');
        };
        return this.doPost(endpoint,body,successCallback,errorCallback,isEndpointAbsolute)
    }

    onLoadList(endpoint:string, list,max, errorCallback = null,isEndpointAbsolute = false) {
        let that = this;
        let successCallback= response => {
            Object.assign(list, response.json());
        };
        return this.doGet(endpoint,successCallback,errorCallback,isEndpointAbsolute);
    }

    onDelete(endpoint:string,id, list ,errorCallback = null,isEndpointAbsolute = false) {
        let that = this;
        let successCallback= response => {
            if(list != null){
                let index = list.findIndex(obj => obj.id == id);
                if(index!=-1)
                    list.splice(index,1);
            }
            if(that.toastr)
                that.toastr.success('Borrado con éxito','Notificación');
        };
        this.doDelete(endpoint,successCallback,errorCallback,isEndpointAbsolute);
    }
    onUpdate(endpoint:string,body,data, errorCallback = null,isEndpointAbsolute = false){
        let that = this;
        let successCallback= response => {
            Object.assign(data, response.json());
            if(that.toastr)
                that.toastr.success('Actualizado con éxito','Notificación');
        };
       return this.doPut(endpoint,body,successCallback,errorCallback,isEndpointAbsolute)
    }
    
    valideVersion(){
        if(localStorage.getItem('VERSION_CACHE') && localStorage.getItem('VERSION_CACHE_HEADER'))
            if(localStorage.getItem('bearer') && (localStorage.getItem('VERSION_CACHE') != localStorage.getItem('VERSION_CACHE_HEADER')))
            {
                localStorage.setItem('VERSION_CACHE',localStorage.getItem('VERSION_CACHE_HEADER'));
                location.reload(true);
            }
    }
}