import {Component, OnInit, AfterContentInit} from "@angular/core";
import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {NotificationModel} from "../../../com.zippyttech.business/notification/notification.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {FormComponent} from "../../../com.zippyttech.ui/components/form/form.component";

@Component({
    moduleId:module.id,
    selector: 'generate-notification',
    templateUrl:'template.html',
    styleUrls: ['style.css']
})
export class GenerateNotificationComponent extends ControllerBase implements OnInit{
    public pathElements=StaticValues.pathElements;
    public params:any={};
    public image:string;
    public instanceForm:FormComponent;

    constructor(public db:DependenciesBase){
        super(db);
    }

    initModel() {
        this.model = new NotificationModel(this.db);
        if(!this.db.myglobal.existsPermission('NOTIFICATION_SEND_CODE'))
            delete this.model.rulesSave.code;

        if(!this.db.myglobal.existsPermission('NOTIFICATION_SEND_WAY'))
            delete this.model.rulesSave.wayType;

        if(!this.db.myglobal.existsPermission('NOTIFICATION_SEND_TARGETTYPE')) {
            delete this.model.rulesSave.targetType;
            this.model.rulesSave.target.title = "Email";
        }
    }

    sendNotification(event){
        if(event)
            event.stopImmediatePropagation();
        this.submitForm();
    }

    submitForm(){
        this.model.rest.findData = true;
        let successCallback= response => {
            this.model.rest.findData = false;
            this.model.addToast('Notificación','Guardado con éxito');
            this.instanceForm.resetForm();
        };
        let body = this.instanceForm.getFormValues();
        this.model.httputils.doPost(this.model.endpoint,JSON.stringify(body),successCallback,this.model.error);
    }
    private get _enableForm():boolean{
        if(this.instanceForm && this.instanceForm.isValidForm())
            if(!this.model.rest.findData){
                if(this.instanceForm.form.value['detail'] && this.instanceForm.form.value['detail'].trim().length)
                    return true;
                if(this.instanceForm.form.value['image'] && this.instanceForm.form.value['image'].trim().length)
                    return true;
            }
        return false;
    }

    setForm(event){
        this.instanceForm = event;
    }

    changeImage(image:string){
        this.image = image;
        this.instanceForm.form.controls['image'].setValue(image);
    }
}


