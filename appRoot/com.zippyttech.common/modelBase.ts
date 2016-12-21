import {StaticValues} from "../com.zippyttech.utils/catalog/staticValues";
import {globalService} from "../com.zippyttech.utils/globalService";
declare var moment:any;
export abstract class ModelBase{

    public prefix = "DEFAULT";
    public endpoint = "DEFAULT_ENDPOINT";
    public completed=false;
    public permissions:any = {};
    public paramsSearch:any = {};
    public paramsSave:any = {};
    public ruleObject:any={};
    public rulesSave:any={};
    public msg:any=StaticValues.msg;

    public configId = moment().valueOf();
    private rulesDefault:any = {};
    public rules={};

    constructor(prefix,endpoint,public myglobal:globalService){
        this.prefix = prefix;
        this.endpoint = endpoint;

        this._initModel();
    }

    private _initModel(){
        this._initPermissions();
        this._initRules();
        this._initParamsSearch();
        this._initParamsSave();
        this._initRuleObject();
    }
    public initModel(completed=true){
        this.initPermissions();
        this.modelExternal();
        this.initRules();
        this.initRulesSave();
        this.initParamsSearch();
        this.initParamsSave();
        this.initRuleObject();

        this.loadObjectRule();
        this.loadParamsSave();
        this.loadParamsSearch();

        this.completed=completed;
    }

    abstract initPermissions();
    private _initPermissions() {
        this.permissions['list'] = this.myglobal.existsPermission([this.prefix + '_LIST']);
        this.permissions['add'] = this.myglobal.existsPermission([this.prefix + '_ADD']);
        this.permissions['update'] = this.myglobal.existsPermission([this.prefix + '_UPDATE']);
        this.permissions['delete'] = this.myglobal.existsPermission([this.prefix + '_DELETE']);
        this.permissions['filter'] = this.myglobal.existsPermission([this.prefix + '_FILTER']);
        this.permissions['search'] = (this.myglobal.existsPermission([this.prefix + '_SEARCH']) && this.myglobal.existsPermission([this.prefix + '_LIST']));
        this.permissions['lock'] = this.myglobal.existsPermission([this.prefix + '_LOCK']);
        this.permissions['warning'] = this.myglobal.existsPermission([this.prefix + '_WARNING']);
        this.permissions['visible'] = true;//this.myglobal.existsPermission([this.prefix + '_VISIBLE']);
        this.permissions['audit'] = this.myglobal.existsPermission([this.prefix + '_AUDICT']);
    }

    abstract modelExternal();
    abstract initRules();
    abstract initRulesSave();
    private _initRules() {
        this.rulesDefault["detail"] = {
            "update": this.permissions.update,
            "visible": this.permissions.visible,
            "search": this.permissions.filter,
            "showbuttons": true,
            'icon': 'fa fa-list',
            "type": "textarea",
            "key": "detail",
            "title": "Detalle",
            "placeholder": "ingrese el detalle",
        };
        this.rulesDefault["enabled"] = {
            "update": (this.permissions.update && this.permissions.lock),
            "visible": this.permissions.lock && this.permissions.visible,
            "search": false,
            'required': true,
            'icon': 'fa fa-list',
            "type": "boolean",
            'source': [
                {'value':true,'text': 'Habilitado', 'class': 'btn btn-sm btn-green'},
                {'value':false,'text': 'Deshabilitado', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "enabled",
            "title": "Habilitado",
            "placeholder": "",
        };
    }

    abstract initParamsSearch();
    private _initParamsSearch() {
        this.paramsSearch = {
            'title': 'Title Default',
            'permission': (this.permissions.search && this.permissions.list),
            'idModal': this.prefix + '_' + this.configId + '_search',
            'endpoint': "/search" + this.endpoint,
            'placeholder': "Placeholder default",
            'label': {'title': "titulo: ", 'detail': "detalle: "},
            'msg': {
                'errors': {
                    'noAuthorized': this.msg.noAuthorized,
                },
            },
            'where': '',
            'imageGuest': StaticValues.pathElements.favicon,
            'field':'any'
        };
    }
    private loadParamsSearch(){
        this.paramsSearch.field = this.ruleObject.key+'.id';
    }

    abstract initParamsSave();
    private _initParamsSave() {
        this.paramsSave = {
            'title': 'Title Default',
            'updateField':false,
            'permission': this.permissions.add,
            'idModal': this.prefix + '_' + this.configId + '_add',
            'endpoint': this.endpoint,
        };
    }

    abstract initRuleObject();
    private _initRuleObject() {
        this.ruleObject = {
            'icon': 'fa fa-list',
            'update':false,
            'search':false,
            "type": "text",
            "required":true,
            "visible":true,
            "key": "keyDefault",
            "keyDisplay": "keyDefault",
            "title": "TipoDefault",
            'object': true,
            'code': 'default',
            'prefix':'',
            "placeholder": "PlaceHolder default",
            'paramsSearch': {},
            "permissions": {},
            "rulesSave":{},
            "paramsSave":{}
        }
    }

    getRulesDefault(){
        return this.rulesDefault;
    }
    private loadObjectRule(){
        this.ruleObject.rulesSave = this.rulesSave;
        this.ruleObject.paramsSave = this.paramsSave;
        this.ruleObject.permissions = this.permissions;
        this.ruleObject.paramsSearch = this.paramsSearch;
        this.ruleObject.prefix = this.prefix;
        this.ruleObject.search = this.permissions.search;

    }
    private loadParamsSave(){
        this.paramsSave.prefix = this.prefix+'_ADD';
    }

    public setDataField(id,key,value?,callback?,data?){
        let json = {};
        json[key] = value || null;
        let body = JSON.stringify(json);
        return (this.myglobal.httputils.onUpdate(this.endpoint + id, body,{}).then(response=>{
            if(callback)
                callback(response,data);
        }));
    }
    public loadDataModel(successCallback){
        return this.myglobal.httputils.doGet(this.endpoint,successCallback,this.error);
    }
    public onSave(body,successCallback){
        return this.myglobal.httputils.doPost(this.endpoint,JSON.stringify(body),successCallback,this.error);
    }
    public loadDataModelWhere(successCallback,where=[],id=''){
        let _where="?where="+encodeURI(JSON.stringify(where).split('{').join('[').split('}').join(']'));
        return this.myglobal.httputils.doGet(this.endpoint+id+_where,successCallback,this.error);
    }
    public error(error){
        console.log(error);
    }

    public extendRulesObjectInRules(rules){
        let that = this;

        Object.keys(rules).forEach(key=>{
            if(rules[key].object){
                Object.keys(rules[key].rulesSave).forEach(subKey=>{
                    rules[key+that.capitalizeFirstLetter(subKey)] = rules[key].rulesSave[subKey];
                    rules[key+that.capitalizeFirstLetter(subKey)].search=false;
                })
            }
        })
    }
    public capitalizeFirstLetter (data) {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }


}