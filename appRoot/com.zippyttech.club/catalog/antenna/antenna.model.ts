import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class AntennaModel extends ModelBase{


    constructor(public db:DependenciesBase){
        super(db,'/antennas/');
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
        this.rules['type']={
            'type': 'select',
            'required':true,
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'source': [
                {'value': 'entrada', 'text': 'entrada'},
                {'value': 'salida', 'text': 'salida'},
            ],
            'key': 'type',
            'title': 'Dirección',
            'placeholder': 'Seleccione un la dirección',
        };
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar antena";
        this.paramsSearch.placeholder="Ingrese la antena";
        this.paramsSearch.label.title="Título: ";
        this.paramsSearch.label.detail="Código: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar antena"
    }
    initRuleObject() {
        this.ruleObject.title="Antenas";
        this.ruleObject.placeholder="Ingrese la antena";
        this.ruleObject.key="antenna";
        this.ruleObject.keyDisplay="antennaTitle";
        this.ruleObject.code="antennaId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }


    initModelActions(params: IModelActions) {
        params['delete'].message = '¿ Esta seguro de eliminar la antena: ';
        params['delete'].key = 'title';
    }
}
