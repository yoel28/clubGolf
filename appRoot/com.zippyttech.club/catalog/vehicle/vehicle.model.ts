import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {ModelModel} from "../model/model.model";
import {VehicleTypeModel} from "../vehicleType/vehicleType.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";

export class VehicleModel extends ModelBase{

    public vehicleType:any;
    public model:any;
    public user:any;


    constructor(public db:DependenciesBase,useGlobal=true){
        super(db,'/vehicles/');
        this.initModel();
    }
    modelExternal() {
        this.user = new UserModel(this.db,false);
        this.model = new ModelModel(this.db);
        this.vehicleType = new VehicleTypeModel(this.db);

    }
    initRules() {
        this.rules['tags'] = {
            'type': 'list',
            'typeView':'modal',
            'maxLength': '35',
            'required':true,
            'readOnly':true,
            'prefix':'TAG',
            'value':[],
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'tags',
            'title': 'Tags',
            'instance':null,//tipo list van a mantener la instancia para poder manipular el objecto
            'tagFree':this.permissions.tagFree,
            'refreshField':{
                'icon':'fa-refresh',
                'endpoint':'/read/tags',
                'callback':function (rules,newData,control) {
                        newData.forEach(obj=> {
                            obj.tags.forEach(tag => {
                                rules.instance.addValue({
                                    'id': obj.code,
                                    'value': tag,
                                    'title': obj.title + '(' + (obj.code || 'Local') + ')'
                                });
                            })
                        });
                },
            },
            'placeholder': 'Tags',
        };

        this.rules['plate'] = {
            'type': 'text',
            'icon': 'fa fa-font',
            'required': true,
            'maxLength': '35',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'plate',
            'title': 'Placa',
            'placeholder': 'Placa del vehículo',
        };
        //RULE:PREFIX:TITLE
        this.rules['user'] = this.user.ruleObject;
        this.rules['user'].required=true;
        this.rules['user'].update= this.permissions.update;

        this.rules['year'] = {
            'type': 'number',
            'icon': 'fa fa-font',
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'year',
            'title': 'Año',
            'placeholder': 'Año del vehículo',
        };
        this.rules['color']= {
            'type': 'text',
            'icon':'fa fa-font',
            'maxLength':'35',
            'update':this.permissions.update,
            'search':false,
            'visible':this.permissions.visible,
            'key': 'color',
            'title': 'Color',
            'placeholder': 'Color del vehículo',
        };

        this.rules['model'] = this.model.ruleObject;
        this.rules['model'].required=false;
        this.rules['model'].update= this.permissions.update;

        this.rules['vehicleType'] = this.vehicleType.ruleObject;
        this.rules['vehicleType'].required=false;
        this.rules['vehicleType'].update= this.permissions.update;
        this.rules['vehicleType'].search = false;

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
        this.rules['detail'].search = false;
        this.rules['ip'].search = false;
    }
    initPermissions() {
        this.permissions['tagFree'] =  this.db.myglobal.existsPermission(this.prefix+'_TAG_FREE')
    }
    initParamsSearch() {
        this.paramsSearch.title="Buscar vehículo";
        this.paramsSearch.placeholder="Ingrese vehículo";
        this.paramsSearch.label.title="Propietario: ";
        this.paramsSearch.label.detail="Placa: ";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar vehículo"
    }
    initRuleObject() {
        this.ruleObject.title="Vehículo";
        this.ruleObject.placeholder="Ingrese vehículo";
        this.ruleObject.key="vehicle";
        this.ruleObject.code="vehicleId";
        this.ruleObject.keyDisplay = "vehiclePlate";

    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);
        delete this.rules['tagEpc'];
        delete this.rulesSave.enabled;
        delete this.rulesSave.tag;
    }


    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar la placa: ';
        params['delete'].key = 'plate';
    }


    public fieldToArray(data:Object,key:string):any[]{
        if(data[key] && (data[key] instanceof Array)) {
            let array:any[]=[];
            switch (key) {
                case 'tags':
                    for (let item of data[key])
                        array.push(item['epc']);
                    break;
            }
            if(array.length <= 0)
                array.push("N/A");
            return array;
        }
        return null;
    }
}
