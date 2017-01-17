import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {ModelModel} from "../model/model.model";
import {BrandModel} from "../brand/brand.model";
import {VehicleTypeModel} from "../vehicleType/vehicleType.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";

export class VehicleModel extends ModelBase{

    public vehicleType:any;
    public brand:any;
    public model:any;
    public user:any;
    public tag:any;

    public TAG_LOCAL:boolean=false;
    public ANT_READ_ADDRESS:string;

    constructor(public db:DependenciesBase,useGlobal=true){
        super(db,'VEH','/vehicles/',useGlobal);
        this.initModel();
    }
    modelExternal() {
        this.user = new UserModel(this.db);
        this.model = new ModelModel(this.db);
        this.brand = new BrandModel(this.db);
        this.vehicleType = new VehicleTypeModel(this.db);

    }
    initRules() {
        this.TAG_LOCAL = this.db.myglobal.getParams('TAG_LOCAL')=='true'?true:false;
        this.ANT_READ_ADDRESS = this.db.myglobal.getParams('ANT_READ_ADDRESS');

        this.rules['tags'] = {
            'type': 'list',
            'icon': 'fa fa-font',
            'maxLength': '35',
            'readOnly':true,
            'value':[],
            'update': this.permissions.update,
            'search': this.permissions.filter,
            'visible': this.permissions.visible,
            'key': 'tags',
            'title': 'Tag',
            'refreshField':{
                'icon':'fa-refresh',
                'endpoint':this.TAG_LOCAL?this.ANT_READ_ADDRESS:'/read/tags',
                'absolute':this.TAG_LOCAL,
                'instance':null,//tipo list van a mantener la instancia para poder manipular el objecto
                'callback':function (rules,newData,control) {
                    if(this.TAG_LOCAL) {
                        let data = newData.split('\n');
                        newData=[];
                        data.forEach(v=>{
                            let val = v.split(';');
                            rules.refreshField.instance.addValue({
                                'id': val[2],
                                'value': val[0],
                                'title': 'Local'
                            });
                        })
                    }
                    else{
                        newData.forEach(obj=> {
                            obj.tags.forEach(tag => {
                                rules.refreshField.instance.addValue({
                                    'id': obj.code,
                                    'value': tag,
                                    'title': obj.type + '(' + obj.code || 'Local' + ')'
                                });
                            })

                        });
                    }
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

        this.rules['user'] = this.user.ruleObject;
        this.rules['user'].required=true;

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
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'color',
            'title': 'Color',
            'placeholder': 'Color del vehículo',
        };

        this.rules['model'] = this.model.ruleObject;
        this.rules['model'].required=false;

        this.rules['vehicleType'] = this.vehicleType.ruleObject;
        this.rules['vehicleType'].required=false;

        this.rules = Object.assign({},this.rules,this.getRulesDefault());
    }
    initPermissions() {}
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

}
