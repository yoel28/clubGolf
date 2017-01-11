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
        super(db,'RECORD','/records/');
    }

    initModel(){
        this.model = new RecordModel(this.db.myglobal);

        delete (<RecordModel>this.model).rulesSave['entering'];
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
        if(this.instanceForm && this.instanceForm.form){
            return this.instanceForm.isValidForm();
        }
        return false;
    }

}