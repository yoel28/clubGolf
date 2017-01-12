import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

export class AntennaModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'ANT','/antennas/');
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
            'placeholder': 'Selecccione un la dirección',
        };
        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar antena";
        this.paramsSearch.placeholder="Ingrese la antena";
        this.paramsSearch.label.title="Titulo: ";
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

}
