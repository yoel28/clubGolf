import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class UserStatusModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'/statuses/');
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['title']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'title',
            'title': 'Título',
            'placeholder': 'Título',
        };
        this.rules['code']={
            'type': 'text',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'code',
            'title': 'Código',
            'placeholder': 'Código',
        };
        this.globalOptional();
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar estado de usuario";
        this.paramsSearch.placeholder="Ingrese el estado de usuario";
        this.paramsSearch.label.title="Codigo: ";
        this.paramsSearch.label.detail="Nombre: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar estado de usuario"
    }
    initRuleObject() {
        this.ruleObject.title="Estado";
        this.ruleObject.placeholder="Ingrese el estado de usuario";
        this.ruleObject.key="userStatus";
        this.ruleObject.keyDisplay="userStatusTitle";
        this.ruleObject.code="userStatusId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el estado: ';
        params['delete'].key = 'title';
    }

}
