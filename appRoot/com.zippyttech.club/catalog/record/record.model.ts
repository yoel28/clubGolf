import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {ModelBase} from "../../../com.zippyttech.common/modelBase";
import {VehicleModel} from "../vehicle/vehicle.model";
import {UserModel} from "../../../com.zippyttech.access/user/user.model";
import {AntennaModel} from "../antenna/antenna.model";
import {LocationModel} from "../location/location.model";
import {CompanyModel} from "../company/company.model";
import {UserTypeModel} from "../userType/userType.model";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {IModelActions} from "../../../com.zippyttech.common/modelRoot";
import {StaticFunction} from "../../../com.zippyttech.utils/catalog/staticFunction";

export class RecordModel extends ModelBase{

    private vehicle:any;
    private user:any;
    private userType:any;
    private antennaIn:any;
    private antennaOut:any;
    private location:any;
    private company:any;

    constructor(public db:DependenciesBase){
        super(db,'/records/');
        this.initModel();
        this.initModelFilters();
    }

    modelExternal() {
        this.vehicle = new VehicleModel(this.db);
        this.user = new UserModel(this.db);
        this.userType = new UserTypeModel(this.db);
        this.antennaIn = new AntennaModel(this.db);
        this.antennaOut = new AntennaModel(this.db);
        this.location = new LocationModel(this.db);
        this.company = new CompanyModel(this.db);
    }
    initRules(){

        this.rules['user'] = this.user.ruleObject;
        this.rules['user'].title='Socio';
        this.rules['user'].required=true;
        this.rules['user'].keyDisplay='userName';
        this.rules['user'].update= this.permissions.update;

        this.rules['userName']={
            'type': 'text',
            'hiddenOnly':'(this.searchId["user"] && this.searchId["user"].id)?true:false',
            'key': 'userName',
            'icon': 'fa fa-user',
            'title': 'Nombre',
            'placeholder': 'Nombre de usuario',
        };

        this.rules['vehicle'] = this.vehicle.ruleObject;
        this.rules['vehicle'].title = 'Placa';
        this.rules['vehicle'].update= this.permissions.update;

        this.rules['userType'] = this.userType.ruleObject;
        this.rules['userType'].title = 'Tipo';
        this.rules['userType'].required = false;
        this.rules['userType'].update= this.permissions.update;
        this.rules['userType'].hiddenOnly='(this.searchId["user"] && this.searchId["user"].id)?true:false';


        this.rules['company'] = this.company.ruleObject;
        this.rules['company'].title = 'Empresa';
        this.rules['company'].required=false;
        this.rules['company'].update= this.permissions.update;

        this.rules['location']=this.location.ruleObject;
        this.rules['location'].title='Donde se dirige';
        this.rules['location'].required=false;
        this.rules['location'].update= this.permissions.update;



        this.rules['dateIn']={
            'type': 'combodate',
            'date':'datetime',
            "showbuttons": true,
            "mode":"popup",
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'dateIn',
            'title': 'Fecha de entrada',
            'placeholder': 'Fecha de entrada',
        };
        this.rules['dateOut']={
            'type': 'combodate',
            'date':'datetime',
            "showbuttons": true,
            "mode":"popup",
            'update':this.permissions.update,
            'search':this.permissions.filter,
            'visible':this.permissions.visible,
            'key': 'dateOut',
            'title': 'Fecha de salida',
            'placeholder': 'Fecha de salida',
        };

        this.rules['lotValIn']={
            'type': 'number',
            'step':'0',
            'search': this.permissions.filter,
            'key': 'lotValIn',
            'icon': 'fa fa-clock-o',
            'title': 'Lote E.',
            'placeholder': 'Lote de entrada',
        };
        this.rules['lotValOut']={
            'type': 'number',
            'step':'0',
            'search': this.permissions.filter,
            'key': 'lotValOut',
            'icon': 'fa fa-clock-o',
            'title': 'Lote S.',
            'placeholder': 'Lote de salida',
        };

        this.rules['antennaIn'] = this.antennaIn.ruleObject;
        this.rules['antennaIn'].placeholder="Antena de entrada";
        this.rules['antennaIn'].title="Ant. Entrada";
        this.rules['antennaIn'].key="antennaIn";
        this.rules['antennaIn'].keyDisplay="antennaInTitle";
        this.rules['antennaIn'].update= this.permissions.update;
        this.rules['antennaIn'].paramsSearch.field = 'antennaIn.id';

        this.rules['antennaOut'] = this.antennaOut.ruleObject;
        this.rules['antennaOut'].placeholder="Antena de salida";
        this.rules['antennaOut'].title="Ant. Salida";
        this.rules['antennaOut'].key="antennaOut";
        this.rules['antennaOut'].keyDisplay="antennaOutTitle";
        this.rules['antennaOut'].update= this.permissions.update;
        this.rules['antennaOut'].paramsSearch.field = 'antennaOut.id';




        this.rules['user'].objectOrSave={};
        this.rules['vehicle'].objectOrSave={};
        this.rules['userType'].objectOrSave={};
        this.rules['company'].objectOrSave={};
        this.rules['location'].objectOrSave={};


        this.rules = Object.assign({},this.rules,this.getRulesDefault());

        this.rules['detail'].title="Comentario";
        this.rules['detail'].placeholder="Comentario";
    }
    initPermissions() {}
    initParamsSearch() {
        this.paramsSearch.title="Buscar registro";
        this.paramsSearch.placeholder="Ingrese el registro";
    }
    initParamsSave() {
        this.paramsSave.title="Agregar un registro";
        this.paramsSave.customValidator=(that):boolean=>{
            let countError=0;
            if(!(that && that.form && that.form.valid)){
                countError++;
            }
            if(that && that.form){
                if(that.searchId['user'] && that.searchId['user'].id){
                    that.form.controls['userName'].setValue(null);
                    that.form.controls['userType'].setValue(null);
                }
                if(!that.searchId['user'])
                {
                    that.rules['userName'].required = true;
                    that.rules['userType'].required = true;

                    if(!that.form.controls['userName'].value)
                        countError++;
                    if(!that.form.controls['userType'].value)
                        countError++;
                }
            }
            return countError==0?true:false;
        }
        this.paramsSave.customActions=[ //TODO: Perdio enlace en el dissmis del modal...
            {'title':'Entrada','class':'btn btn-blue','icon':'fa fa-angle-double-up'   ,'addBody':{'entering':true}},
            {'title':'Salida' ,'class':'btn btn-green','icon':'fa fa-angle-double-down','addBody':{'entering':true}}
        ]



    }
    initRuleObject() {
        this.ruleObject.title="Registro";
        this.ruleObject.placeholder="Ingrese el registro";
        this.ruleObject.key="record";
        this.ruleObject.keyDisplay="record";
        this.ruleObject.code="recordId";
    }
    initRulesSave() {
        this.rulesSave = Object.assign({},this.rules);

        this.rulesSave["entering"] = {
            'required': true,
            "type": "boolean",
            'source': [
                {'value':'true','text': 'Entrando', 'class': 'btn btn-sm btn-green'},
                {'value':'false','text': 'Saliendo', 'class': 'btn btn-sm btn-red'},
            ],
            "key": "entering",
            "title": "Dirección",
            'placeholder':'¿Entrando?'
        };


        delete this.rulesSave.enabled;
        delete this.rulesSave.dateIn;
        delete this.rulesSave.dateOut;
        delete this.rulesSave.lotValIn;
        delete this.rulesSave.lotValOut;
        delete this.rulesSave.antennaIn;
        delete this.rulesSave.antennaOut;
    }

    initModelActions(params: IModelActions) {
        params['delete'].message = '¿Esta seguro de eliminar el registro: ';
        params['delete'].key = 'id';
    }

    initModelFilters(){
        this.filters["time"] = {
            view:[
                { title:"Todos las fechas",icon:"fa fa-calendar",colorClass:"",
                    where:null
                },
                { title:"Hoy",icon:"fa fa-calendar",colorClass:"text-blue",
                  where:[{'op': 'ge', 'field': 'dateCreated', 'value':StaticFunction.getDateRange('1').start, 'type':'date', 'code':'hoy'},
                         {'op': 'lt', 'field': 'dateCreated', 'value':StaticFunction.getDateRange('1').end, 'type':'date', 'code':'hoy'}]
                },
                { title:"Semana",icon:"fa fa-calendar",colorClass:"text-green",
                    where:[{'op': 'ge', 'field': 'dateCreated', 'value':StaticFunction.getDateRange('2').start, 'type':'date', 'code':'semana'},
                           {'op': 'le', 'field': 'dateCreated', 'value':StaticFunction.getDateRange('2').end, 'type':'date', 'code':'semana'}]
                },
            ],
            status:1,
            permission: true,
            callback:()=>{}
        };

        this.filters["clients"] = {
            view:[
                { title:"Todos los clientes",icon:"fa fa-car",colorClass:"",
                    where:null
                },
                { title:"Desconocidos",icon:"fa fa-car",colorClass:"text-red",
                  where:[{'op': 'isNull', 'field':'vehicle','code':'desconocidos'}]
                },
                { title:"Conocidos",icon:"fa fa-car",colorClass:"text-blue",
                  where:[{'op': 'isNotNull', 'field':'vehicle','code':'conocidos'}]
                },
            ],
            status:2,
            permission: true,
            callback:()=>{}
        };

        this.filters["registers"] = {
            view:[
                { title:"Todos los registros",icon:"fa fa-folder",colorClass:"",
                    where:null
                },
                { title:"S-E",icon:"fa fa-folder-open",colorClass:"text-yellow",
                    where:[{'op': 'isNull', 'field':'dateIn','code':'S-E'},
                           {'op': 'isNull', 'field':'dateOut','code':'S-E'}]
                },
                { title:"E-S",icon:"fa fa-folder-open",colorClass:"text-blue",
                    where:[{'op': 'isNull', 'field':'dateOut','code':'E-S'},
                           {'op': 'isNotNull', 'field':'dateIn','code':'E-S'}]
                },
                { title:"E+S",icon:"fa fa-folder-open",colorClass:"text-green",
                    where:[{'op': 'isNotNull', 'field':'dateOut','code':'E+S'},
                           {'op': 'isNotNull', 'field':'dateIn','code':'E+S'}]
                },
            ],
            status:0,
            permission: true,
            callback:()=>{}
        };
    }
}
