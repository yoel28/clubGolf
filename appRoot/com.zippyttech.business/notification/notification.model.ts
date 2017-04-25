import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {FormComponent} from "../../com.zippyttech.ui/components/form/form.component";

export class NotificationModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'/notifications/');
        this.initModel(false);
        this.loadDataPublic();
    }

    modelExternal() {}
    initRules(){

        this.rules['code']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'icon': 'fa fa-key',
            'title': 'Código',
            'placeholder': 'Ingrese código'
        };

        this.rules['wayType']={
            'type': 'select',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'value':'FCM',
            'key': 'wayType',
            'title': 'Canal',
            'placeholder': 'Seleccione un canal'
        };

        this.rules['title']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'search' :this.permissions.filter,
            'key': 'title',
            'title': 'Título',
            'placeholder': 'Título',
        };

        this.rules['targetType']={
            'type': 'select',
            'required':true,
            'events':{
                'valueChange':(form:FormComponent,value)=>{
                    if(form.getFormValue('target') && form.getFormValue('target').trim().length)
                        form.form.controls['target'].setValue(form.getFormValue('target'));
                }
            },
            'value':'BY_USER_EMAIL',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'key': 'targetType',
            'title': 'Tipo de destino',
            'placeholder': 'Seleccione un tipo'
        };

        this.rules['target']={
            'type': 'text',
            'hiddenOnly':'this.getFormValue("targetType") ==  "EVERY_BODY"',
            'events':{
                'valueChange':(form:FormComponent,value)=>{
                    if(!this._targetTouch){
                        let target = form.getFormValue('targetType');
                        switch (target){
                            case 'BY_USER_EMAIL':
                                break;
                            case 'BY_ROLE_AUTHORITY':
                                this._loadCheckTarget(form,'/roles/',value);
                                break;
                            case 'BY_USER_TYPE':
                                this._loadCheckTarget(form,'/type/users/',value);
                                break;
                            case 'BY_CONTRACT_CODE':
                                this._loadCheckTarget(form,'/contracts/',value);
                                break;
                            case 'BY_USER_STATUS_CODE':
                                this._loadCheckTarget(form,'/type/users/',value);
                                break;
                            case 'BY_USER_GROUP_CODE':
                                this._loadCheckTarget(form,'/groups/',value);
                                break;
                            case 'BY_MAIN_TYPE':
                                this._loadCheckTarget(form,'/type/main/',value);
                                break;
                            case 'EVERY_BODY':
                                this._targetTouch=true;
                                form.form.controls['target'].setValue('n/a');
                                break;
                        }
                    }
                    else
                        this._targetTouch = false;

                }
            },
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'target',
            'icon': 'fa fa-key',
            'title': 'Destino',
            'placeholder': 'Destino donde se enviara la notificacion'
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());

        this.rules['image']={
            'type': 'image',
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'image',
            'default':this.db.pathElements.robot,
            'title': 'Imagen',
            'placeholder': 'Imagen',
        };
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar notificación";
        this.paramsSearch.placeholder="Ingrese notificación";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar notificación"
    }
    initRuleObject() {
        this.ruleObject.title="Notificación";
        this.ruleObject.placeholder="Ingrese notificación";
        this.ruleObject.key="notification";
        this.ruleObject.keyDisplay="notificationTitle";
        this.ruleObject.keyDisplay="notificationId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
        //delete this.rulesSave.image;
    }
    initModelActions(params){
        params['delete'].message='¿ Esta seguro de eliminar la notificación: ';
        params['delete'].key = 'title';

        params["resend"] = {
            view:[{ title: 'Reenviar', icon: "fa fa-send" }],
            callback:(data?,index?) =>{
                let successCallback = response=>{
                    if(this.httputils.toastyService)
                        this.httputils.addToast('Notificacion','Guardado con éxito');
                };
                this.httputils.doPost(this.endpoint+'resend/'+ data.id,{},successCallback,this.error);
            },
            permission: this.permissions.list,
        };
    }

    loadDataPublic() {
        if(this.db.myglobal.publicData.notification) {
            if (this.db.myglobal.publicData.notification.wayTypes)
                this.db.myglobal.publicData.notification.wayTypes.forEach(obj => {
                    this.rules['wayType'].source.push({'value': obj.name, 'text': obj.code});
                });
            if (this.db.myglobal.publicData.notification.targetType)
                this.db.myglobal.publicData.notification.targetType.forEach(obj => {
                    this.rules['targetType'].source.push({'value': obj.name, 'text': obj.code});
                });
        }
        this.completed = true
    }

    private _targetTouch:boolean;
    private _loadCheckTarget(form:FormComponent,endpoint:string,value=''){
        let successCallback = response =>{
            response = response.json();
            if(response.count == 1){
                if(form.getFormValue('target')==value)
                {
                    this._targetTouch=true;
                    form.form.controls['target'].setValue(response.list[0].title);
                    return;
                }

            }
            form.form.controls['target'].setErrors({object:{valid:false}});
        };
        this.httputils.doGet('/search'+endpoint+value+'?offset=0&max=1',successCallback,this.error)
    }
}