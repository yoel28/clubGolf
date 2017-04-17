import {ModelRoot} from "../../com.zippyttech.common/modelRoot";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {ModelBase} from "../../com.zippyttech.common/modelBase";

export class NotificationModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'/notifications/');
        this.initModel();
        this.loadDataPublic();
    }
    modelExternal() {}
    initRules(){
        this.rules['title']={
            'type': 'text',
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'search' :this.permissions.filter,
            'key': 'title',
            'title': 'Título',
            'placeholder': 'Título',
        };

        this.rules['target']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'target',
            'icon': 'fa fa-key',
            'title': 'Target',
            'placeholder': 'Destino donde se enviara la notificacion'
        };

        this.rules['targetType']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'key': 'targetType',
            'title': 'Tipo de destino',
            'placeholder': 'Seleccione un tipo'
        };

        this.rules['wayType']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [],
            'key': 'wayType',
            'title': 'Canal',
            'placeholder': 'Seleccione un canal'
        };

        this.rules['code']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'icon': 'fa fa-key',
            'title': 'Codigo',
            'placeholder': 'Ingrese codigo'
        };

        this.rules['image']={
            'type': 'image',
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'image',
            'default':this.db.pathElements.robot,
            'title': 'Imagen',
            'placeholder': 'Imagen',
        };

        this.rules = Object.assign({},this.rules,this.getRulesDefault())
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
            view:[{ title: 'Reenviar', icon: "fa fa-vcard" }],
            callback:(data?,index?) =>{
                this.httputils.onSave(this.endpoint+'resend/'+ data.id, {}, data, this.error)
            },
            permission: this.permissions.list,
        };
    }

    loadDataPublic() {
        if(this.db.myglobal.publicData.notification) {
            if (this.db.myglobal.publicData.notification.wayTypes)
                this.db.myglobal.publicData.notification.wayTypes.forEach(obj => {
                    this.rules['wayType'].source.push({'value': obj, 'text': obj});
                });
            if (this.db.myglobal.publicData.notification.targetType)
                this.db.myglobal.publicData.notification.targetType.forEach(obj => {
                    this.rules['targetType'].source.push({'value': obj.name, 'text': obj.code});
                });
        }
        this.completed = true
    }
}