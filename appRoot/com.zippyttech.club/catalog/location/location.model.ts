import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

export class LocationModel extends ModelBase{

    constructor(public db:DependenciesBase){
        super(db,'LOC','/locations/');
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

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar ubicación";
        this.paramsSearch.placeholder="Ingrese la ubicación";
        this.paramsSearch.label.title="Titulo: ";
        this.paramsSearch.label.detail="Código: "
    }
    initParamsSave() {
        this.paramsSave.title="Agregar ubicación"
    }
    initRuleObject() {
        this.ruleObject.title="Ubicaciones";
        this.ruleObject.placeholder="Ingrese la ubicación";
        this.ruleObject.key="location";
        this.ruleObject.keyDisplay="locationTitle";
        this.ruleObject.code="locationId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
