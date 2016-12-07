import {ModelBase} from "../../com.zippyttech.common/modelBase";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {RoleModel} from "../role/role.model";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";

export class UserModel extends ModelBase{
    public rules={};
    public role:any;
    public pathElements=StaticValues.pathElements;

    constructor(public myglobal:globalService){
        super('USER','/users/',myglobal);
        this.initModel(false);
        this.loadData();
    }
    modelExternal() {
        this.role= new RoleModel(this.myglobal);
    }
    initRules(){

        this.rules['username']={
            'type': 'text',
            'required':true,
            'protected':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'username',
            'title': 'Alias',
            'placeholder': 'Alias',
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
        this.rules['email']={
            'type': 'text',
            'email':true,
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'email',
            'title': 'Correo electronico',
            'placeholder': 'Correo electronico',
        };
        this.rules['phone']={
            'type': 'text',
            'required':true,
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
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'password',
            'showbuttons':true,
            'title': 'Contraseña',
            'placeholder': 'Contraseña',
        };

        this.rules['image']={
            'type': 'image',
            'update':this.permissions.update,
            'visible':this.permissions.visible,
            'key': 'image',
            'default':this.pathElements.robot,
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
            "placeholder": "",
        };



        this.rules['roles']=this.role.ruleObject;
        this.rules['roles'].type= 'checklist';
        this.rules['roles'].mode= 'popup';
        this.rules['roles'].showbuttons=true;
        this.rules['roles'].source=[];


        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        delete this.rules['detail'];
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar usuario";
        this.paramsSearch.placeholder="Ingrese el usuario";
        this.paramsSearch.label.title="Alias: ";
        this.paramsSearch.label.detail="Correo: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar usuario"
    }
    initRuleObject() {
        this.ruleObject.title="Usuario";
        this.ruleObject.placeholder="Ingrese el usuario";
        this.ruleObject.key="user";
        this.ruleObject.keyDisplay="userUsername";
        this.ruleObject.code="userId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.roles;
        delete this.rulesSave.enabled;
        delete this.rulesSave.image;
        delete this.rulesSave.accountLocked;
    }
    loadData()
    {
        let that = this;
        let successCallback= response => {
            let roles =  response.json();
            roles.list.forEach(obj=> {
                that.rules['roles'].source.push({'value': obj.id, 'text': obj.authority});
            });
            that.completed = true;
        }
        this.role.loadDataModel(successCallback)
    }

}
