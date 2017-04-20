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
        this.model.rulesSave.target.title = "Email";
        delete this.model.rulesSave.code;
        delete this.model.rulesSave.wayType;
        delete this.model.rulesSave.targetType;
    }

    sendNotification(event){
        if(event)
            event.stopImmediatePropagation();
        this.submitForm();
    }

    submitForm(){
        let successCallback= response => {
            this.model.addToast('Notificacion','Guardado con éxito');
            this.instanceForm.resetForm();
        };
        let body = this.instanceForm.getFormValues();
        if(this.params.updateField)
            this.model.httputils.onUpdate(this.model.endpoint+this.instanceForm.rest.id,JSON.stringify(body),this.instanceForm.dataSelect,this.model.error);
        else
            this.model.httputils.doPost(this.model.endpoint,JSON.stringify(body),successCallback,this.model.error);
    }

    setForm(event){
        this.instanceForm = event;
    }

    changeImage(image:string){
        this.image = image;
    }
}


