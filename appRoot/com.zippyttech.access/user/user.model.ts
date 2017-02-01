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

    constructor(public db:DependenciesBase){
        super(db,'USER','/users/');
        this.initModel(false);
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

        this.rules['id']={
            'type': 'number',
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'id',
            'title': 'ID',
            'placeholder': 'ID',
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


        this.rules['password']={
            'type': 'password',
            'required':true,
            'exclude':true,
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'password',
            'showbuttons':true,
            'title': 'Contraseña',
            'placeholder': 'Contraseña',
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
                {'value':false,'text': 'Verificado', 'class': 'btn btn-sm btn-green'},
                {'value':true, 'text': 'Sin verificar', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "accountLocked",
            "title": "Cuenta",
            "placeholder": "¿Cuenta verificada?",
        };

        this.rules['userType']=this.type.ruleObject;
        this.rules['userType'].required=false;

        this.rules['userGroup']=this.group.ruleObject;
        this.rules['userGroup'].required=false;

        this.rules['contract']=this.contract.ruleObject;
        this.rules['contract'].required=false;

        this.rules['userStatus']=this.status.ruleObject;
        this.rules['userStatus'].required=false;

        this.rules['roles']=this.role.ruleObject;
        this.rules['roles'].type= 'checklist';
        this.rules['roles'].update= this.permissions.update;
        this.rules['roles'].mode= 'popup';
        this.rules['roles'].showbuttons=true;
        this.rules['roles'].source=[];
        this.rules['roles'].search=false;
        this.rules['roles'].exclude=false;


        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        delete this.rules['detail'];
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
        this.ruleObject.key="user";
        this.ruleObject.keyDisplay='user';
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
    loadDataExternal()
    {
        let that = this;
        this.role.loadData().then(response => {
            if(that.role.dataList && that.role.dataList.list)
            {
                that.role.dataList.list.forEach(obj=> {
                    that.rules['roles'].source.push({'value': obj.id, 'text': obj.authority});
                });
            }
            that.completed = true;
        })
    }

}
