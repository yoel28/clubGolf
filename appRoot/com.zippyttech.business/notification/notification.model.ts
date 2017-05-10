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
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'value':this.db.myglobal.getParams('NOTIFICATION_WAY_TYPE_DEFAULT'),
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
                    console.log("value change!!");
                    this.rules["target"].instance.removeAll();
                }
            },
            'value':this.db.myglobal.getParams('NOTIFICATION_TARGET_TYPE_DEFAULT'),
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'key': 'targetType',
            'title': 'Tipo de destino',
            'placeholder': 'Seleccione un tipo'
        };

        this.rules['target']={
            'type': 'list',
            'hiddenOnly':'this.getFormValue("targetType") ==  "EVERY_BODY"',
            'events':{
                'addTag':(form:FormComponent,value,instance)=>{
                    let target = form.getFormValue('targetType');
                    switch (target){
                        case 'BY_USER_EMAIL':
                            this.rules["target"].instance.addValue({
                                'id': 0,
                                'value': value,
                                'title': 'Entrada manual'
                            });
                            break;
                        case 'BY_ROLE_AUTHORITY':
                            this._loadCheckTarget(form,'/roles/',value,instance);
                            break;
                        case 'BY_USER_TYPE':
                            this._loadCheckTarget(form,'/type/users/',value,instance);
                            break;
                        case 'BY_CONTRACT_CODE':
                            this._loadCheckTarget(form,'/contracts/',value,instance);
                            break;
                        case 'BY_USER_STATUS_CODE':
                            this._loadCheckTarget(form,'/type/users/',value,instance);
                            break;
                        case 'BY_USER_GROUP_CODE':
                            this._loadCheckTarget(form,'/groups/',value,instance);
                            break;
                        case 'BY_MAIN_TYPE':
                            this._loadCheckTarget(form,'/type/main/',value,instance);
                            break;
                        case 'EVERY_BODY':
                            this._targetTouch=true;
                            form.form.controls['target'].setValue('n/a');
                            break;
                    }
                }
            },
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'target',
            'icon': 'fa fa-key',
            'title': 'Destino',
            'placeholder': 'Destino',
            'value':[],
            'tagFree':true,
            'instance':null
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules["detail"].required = true;
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
        delete this.rulesSave.code;
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

    private _loadCheckTarget(form:FormComponent,endpoint:string,value='',instance){
        let successCallback = response =>{
            response = response.json();
            if(response.count == 1){
                let tag = {'id': 0, 'value': response.list[0].title, 'title': 'Entrada manual'};
                let exist = (this.rules["target"].instance.control.value.indexOf(tag) != -1);
                if (!exist)
                    this.rules["target"].instance.addValue(tag);
            }
            else if(response.count > 1){
                this.addToast('Demaciadas coincidencias!','Ingrese un valor mas especifico','warning',5000);
            }
            else if(response.count == 0){
                this.addToast('No hay coincidencias','Ingrese otro valor','error',5000);
            }
        };
        this.httputils.doGet('/search'+endpoint+value+'?offset=0&max=1',successCallback,this.error);
    }
}