import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class ContractModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'/contracts/');
        this.initModel();
    }
    modelExternal() {}
    initRules(){
        this.rules['title']={
            'type': 'text',
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

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar contrato";
        this.paramsSearch.placeholder="Ingrese el contrato";
        this.paramsSearch.label.title="Título: ";
        this.paramsSearch.label.detail="Código: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar contrato"
    }
    initRuleObject() {
        this.ruleObject.title="Contrato";
        this.ruleObject.placeholder="Ingrese el contrato";
        this.ruleObject.key="contract";
        this.ruleObject.keyDisplay="contractCode";
        this.ruleObject.code="contractId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el contrato: ';
        params['delete'].key = 'code';
    }
}
