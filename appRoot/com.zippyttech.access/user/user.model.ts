import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {RoleModel} from "../role/role.model";
import {UserTypeModel} from "../../com.zippyttech.club/catalog/userType/userType.model";
import {UserStatusModel} from "../../com.zippyttech.club/catalog/userStatus/userStatus.model";
import {ContractModel} from "../../com.zippyttech.club/catalog/contract/contract.model";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {UserGroupModel} from "../../com.zippyttech.club/catalog/userGroup/userGroup.model";

export class UserModel extends ModelBase{
    private role:any;
    private type:any;
    private status:any;
    private contract:any;
    private group:any;

    constructor(public db:DependenciesBase,loadRole:boolean=true){
        super(db,'/users/');
        this.initModel(!loadRole);
        if(loadRole)
            this.loadDataExternal();
    }
    modelExternal() {
        this.role= new RoleModel(this.db);
        this.type= new UserTypeModel(this.db);
        this.status= new UserStatusModel(this.db);
        this.contract = new ContractModel(this.db);
        this.group = new UserGroupModel(this.db);
    }
    initRules(){
        this.rules['email']={
            'type': 'text',
            'email':true,
            'required':true,
            'setEqual':'username',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'email',
            'title': 'Correo electrónico',
            'placeholder': 'Correo electrónico',
        };

        this.rules['idCard']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'idCard',
            'title': 'Cédula',
            'placeholder': 'Cédula',
        };
        this.rules['username']={
            'type': 'text',
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'username',
            'title': 'Usuario',
            'placeholder': 'Usuario',
        };
        this.rules['name']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'name',
            'title': 'Nombre',
            'placeholder': 'Nombre',
        };
        this.rules['phone']={
            'type': 'text',
            'forceInSave':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'phone',
            'title': 'Teléfono',
            'placeholder': 'Teléfono',
        };

        this.rules['image']={
            'type': 'image',
            'exclude':true,
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'image',
            'default':this.db.pathElements.robot,
            'title': 'Imagen',
            'placeholder': 'Imagen',
        };
        this.rules["accountLocked"] = {
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'search':this.permissions.filter,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {
                    'value': true,
                    'text': 'Sin verificar',
                    'class': 'btn-transparent  text-red',
                    'title': 'Sin verificar',
                    'icon': 'fa fa-exclamation-circle'
                },
                {
                    'value': false,
                    'text': 'Verificado',
                    'class': 'btn-transparent text-blue',
                    'title': 'Verificado',
                    'icon': 'fa fa-check-circle'
                }
            ],
            "key": "accountLocked",
            "title": "Verificada",
            "placeholder": "¿Cuenta verificada?",
        };

        this.rules['userType']=this.type.ruleObject;
        this.rules['userType'].required=false;
        this.rules['userType'].update= this.permissions.update;

        this.rules['userGroup']=this.group.ruleObject;
        this.rules['userGroup'].required=false;
        this.rules['userGroup'].update= this.permissions.update;

        this.rules['contract']=this.contract.ruleObject;
        this.rules['contract'].required=false;
        this.rules['contract'].objectOrSave={};
        this.rules['contract'].update= this.permissions.update;
        this.rules['contract'].forceInSave = true;

        this.rules['userStatus']=this.status.ruleObject;
        this.rules['userStatus'].required=false;
        this.rules['userStatus'].update= this.permissions.update;

        this.rules['roles']=this.role.ruleObject;
        this.rules['roles'].type= 'checklist';
        this.rules['roles'].update= this.permissions.update;
        this.rules['roles'].mode= 'popup';
        this.rules['roles'].showbuttons=true;
        this.rules['roles'].source=[];
        this.rules['roles'].search=false;
        this.rules['roles'].exclude=true;

        this.rules['password']={
            'type': 'password',
            'required':true,
            'exclude':true,
            'minLength':6,
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'password',
            'showbuttons':true,
            'title': 'Contraseña',
            'placeholder': 'Contraseña',
        };


        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        delete this.rules['detail'];
    }
    public updateProfile(){
        this.setEndpoint('/auto/update');
        this.rules['idCard'].update=true;
        this.rules['name'].update=true;
        this.rules['phone'].update=true;
        this.rules['image'].update=true;
        this.rules['password'].update=true;


        if(this.rules['account'])
            this.rules['account'].update=false;

        this.rules['email'].update=false;
        this.rules['username'].update=false;
        this.rules['roles'].update=false;
        this.rules['contract'].update=false;
        this.rules['userType'].update=false;
        this.rules['userStatus'].update=false;
        this.rules['userGroup'].update=false;
    }

    initPermissions() {
        this.permissions['roleSave']=this.db.myglobal.existsPermission(['USER_ROLE_SAVE'])
    }
    initParamsSearch() {
        this.paramsSearch.title="Buscar usuario";
        this.paramsSearch.placeholder="Ingrese el usuario";
        this.paramsSearch.label.title="Alias: ";
        this.paramsSearch.label.detail=""
    }
    initParamsSave() {
        this.paramsSave.title="Agregar usuario"
    }
    initRuleObject() {
        this.ruleObject.title="Usuario";
        this.ruleObject.placeholder="Ingrese el usuario";
        this.ruleObject.keyDisplay='user';
        this.ruleObject.key='user';
        this.ruleObject.eval=this.db.myglobal.getRule('USER_DISPLAY_WEB');
        this.ruleObject.code="userId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.id;
        delete this.rulesSave.roles;
        delete this.rulesSave.enabled;
        delete this.rulesSave.image;
        delete this.rulesSave.accountLocked;
        delete this.rulesSave.username;
    }
    loadDataExternal() {
        if(this.db.myglobal.publicData && this.db.myglobal.publicData['roles'])
        {
            this.loadRoles();
        }
        else {
            this.role.loadData().then((response => {
                if(this.role.dataList && this.role.dataList.list)
                {
                    this.db.myglobal.publicData['roles']=this.role.dataList.list;
                    this.loadRoles();
                }
            }).bind(this));
        }
    }
    loadRoles(){
        this.db.myglobal.publicData['roles'].forEach((obj=> {
            if(this.rules['roles']){
                this.rules['roles'].source.push({'value': obj.id, 'text': obj.authority});
            }
        }).bind(this));
        this.completed = true;
    }
    initModelActions(params){
        params['delete'].message='¿ Esta seguro de eliminar el usuario: ';
        params['delete'].key = 'username';
    }

    inviteAll(body:Object){
        let callback=(response)=>{
            let data=response.json().response;
            //{"response":{"sended":["yo3l.m18@gmail.com"],"failed":[{"email":"adrian.and1@gmail.com","message":"Luis Adrian Gonzalez Benavides ya es un socio del club"}]}}
            if(!data.failed || (!data.failed.length)){
                this.addToast('Notificación','Invitaciones enviadas con exito.')
            }
            else{
                data.sended.forEach(email=>{
                    this.addToast('Notificación','Invitación enviada a '+email)
                });
                data.failed.forEach(obj=>{
                    this.addToast('No enviada','el '+obj.email+' '+obj.message,'error')
                })

            }
        };
        this.httputils.doPost('/inviteAll',JSON.stringify({list:body['email'],timeLimit:body['timeLimit']}),callback,this.error)
    }

}
