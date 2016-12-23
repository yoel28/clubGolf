import {ControllerBase} from "../../../com.zippyttech.common/ControllerBase";
import {Component} from "@angular/core";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {RecordModel} from "../../catalog/record/record.model";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {FormComponent} from "../../../com.zippyttech.ui/components/form/form.component";

declare var SystemJS:any;
@Component({
    moduleId:module.id,
    selector: 'record-in-out',
    templateUrl:'index.html',
    styleUrls: ['../style.css'],
})
export class RecordInOutComponent extends ControllerBase {
    public record:any;
    public pathElements=StaticValues.pathElements;
    public instanceForm:FormComponent;

    constructor(public db:DependenciesBase){
        super('RECORD','/records/',db.router,db.http,db.myglobal,db.toastyService,db.toastyConfig);
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
        if(this.instanceForm && this.instanceForm.form && this.instanceForm.form.valid)
        {
            if(this.instanceForm.searchId['user'] && this.instanceForm.searchId['user'].id){
                this.instanceForm.form.controls['userName'].setValue(null);
                return true;
            }
            if(!this.instanceForm.searchId['user'] && this.instanceForm.form.controls['userName'].value)
            {
                return true;
            }
        }
        return false;
    }

}