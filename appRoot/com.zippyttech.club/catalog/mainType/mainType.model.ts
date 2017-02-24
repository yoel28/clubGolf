import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class MainTypeModel extends ModelBase{
    private mainType;
    constructor(public db:DependenciesBase){
        super(db,'/type/main/');
        this.initModel();
    }
    modelExternal() {
        this.mainType = new MainTypeModel(this.db);
    }
    initRules() {
        this.rules['title'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '35',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'title',
            'title': 'Título',
            'placeholder': 'Título',
        };
        this.rules['code'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '35',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'code',
            'title': 'Código',
            'placeholder': 'Código',
        };


        this.rules['mainType'] = this.mainType.ruleObject;
        this.rules['mainType'].required=true;
        this.rules['mainType'].update= this.permissions.update;


        this.globalOptional();
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar tipo de usuario (Principal)";
        this.paramsSearch.placeholder="Ingrese el tipo de usuario (Principal)";
        this.paramsSearch.label.title="Código: ";
        this.paramsSearch.label.detail="Nombre: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar tipo de usuario (Principal)"
    }
    initRuleObject() {
        this.ruleObject.title="Tipo (Principal)";
        this.ruleObject.placeholder="Ingrese el tipo de usuario (Principal)";
        this.ruleObject.key="mainType";
        this.ruleObject.code="mainTypeId";
        this.ruleObject.keyDisplay = "mainTypeTitle";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

    initModelActions(params: IModelActions){
        params['delete'].message='¿ Esta seguro de eliminar el tipo de usuario (Principal): ';
    }

}
