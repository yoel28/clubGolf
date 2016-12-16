import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {globalService} from "../../../com.zippyttech.utils/globalService";


export class ModelModel extends ModelBase{

    constructor(public myglobal:globalService){
        super('MOD','/model/',myglobal);
        this.initModel();
    }
    modelExternal() {}
    initRules() {
        this.rules = Object.assign({},this.rules,this.getRulesDefault())
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar modelo";
        this.paramsSearch.placeholder="Ingrese el modelo";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar modelo"
    }
    initRuleObject() {
        this.ruleObject.title="Modelo";
        this.ruleObject.placeholder="Ingrese el modelo";
        this.ruleObject.key="model";
        this.ruleObject.code="modelId";
        this.ruleObject.keyDisplay = "modelCode";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rulesSave.enabled;
    }

}
