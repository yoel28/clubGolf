import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {Component} from "@angular/core";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../catalog/record/record.model";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {FormComponent} from "../../../com.zippyttech.ui/components/form/form.component";
import {AnimationsManager} from "../../../com.zippyttech.ui/animations/AnimationsManager";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'record-in-out',
    templateUrl:'index.html',
    styleUrls: ['../style.css'],
    animations: AnimationsManager.getTriggers("d-slide_up|fade-fade",200)
})
export class RecordInOutComponent extends ControllerBase {
    public record:any;
    public pathElements=StaticValues.pathElements;
    public instanceForm:FormComponent;

    constructor(public db:DependenciesBase){
        super('RECORD','/records/',db);
    }

    initModel(){
        this.model = new RecordModel(this.db.myglobal);

        this.model=Object.assign({},this.model)

    }
    setForm(form){
        this.instanceForm=form
    }
    saveForm(event,entering=true){
        if(event)
            event.preventDefault();
        let body = this.instanceForm.getFormValues();
        body['entering']=entering;

        this.onSave(body);
    }
    formValid():boolean{
        let countError=0;
        if(!(this.instanceForm && this.instanceForm.form && this.instanceForm.form.valid)){
            countError++;
        }

        if(this.instanceForm && this.instanceForm.form){
            if(this.instanceForm.searchId['user'] && this.instanceForm.searchId['user'].id){
                this.instanceForm.form.controls['userName'].setValue(null);
                this.instanceForm.form.controls['userType'].setValue(null);
            }

            if(!this.instanceForm.searchId['user'])
            {
                this.instanceForm.rules['userName'].required = true;
                this.instanceForm.rules['userType'].required = true;

                if(!this.instanceForm.form.controls['userName'].value)
                    countError++;
                if(!this.instanceForm.form.controls['userType'].value)
                    countError++;
            }
        }
        return countError==0?true:false;
    }

}