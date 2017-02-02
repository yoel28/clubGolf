import {Component, EventEmitter, OnInit, AfterContentChecked, NgModule} from "@angular/core";
import {StaticValues} from "../../../com.zippyttech.utils/catalog/staticValues";
import {StaticFunction} from "../../../com.zippyttech.utils/catalog/staticFunction";
import {DependenciesBase} from "../../../com.zippyttech.common/DependenciesBase";
import {XFootable} from "../../../com.zippyttech.utils/directive/xFootable";

declare var SystemJS:any;
declare var moment:any;

@NgModule({
    imports:[XFootable]
})
@Component({
    selector: 'tables-view',
    templateUrl: SystemJS.map.app+'/com.zippyttech.ui/components/tables/index.html',
    styleUrls: [SystemJS.map.app+'/com.zippyttech.ui/components/tables/style.css'],
    inputs:['params','model'],
    outputs:['getInstance'],
})

export class TablesComponent implements OnInit {


    public params:any={};
    public model:any={};
    public searchId:any={};
    data:any = [];
    public keys:any = [];
    public dataSelect:any={};
    public modelReference :any={};//cargar data a referencias en otros metodos

    public keyActions =[];
    public configId=moment().valueOf();
    public getInstance:any;
    private _currentPage: number;

    constructor(public db:DependenciesBase) {
        this._currentPage = -1;
        this.getInstance = new EventEmitter();
        //Array.observe(this.model.dataList, ()=>{});
    }

    ngOnInit() {
        this.keyActions=[];
        if(this.params && this.params.actions)
            this.keyActions=Object.keys(this.params.actions);
        this.getListObjectNotReferenceSave();
    }

    ngAfterViewInit() {
        this.getInstance.emit(this);
    }


    public get currentPage(){
        if(this._currentPage = -1)
            this._currentPage = (this.model.rest.offset/this.model.rest.max)+1;
        return this._currentPage;
    }

    public set currentPage(value:number){
        this._currentPage = value;
        this.model.loadData(value);
    }

    private instanceSearch={};
    setInstanceSearch(type,instance){
        this.instanceSearch[type] =  instance;
    }
    
    private keyVisible() {
        let data=[];
        let that=this;
        Object.keys(this.model.rules).forEach((key)=>{
            if(that.model.rules[key].visible)
                data.push(key)
        });
        return data;
    }

    public searchTable:any = {};
    public searchTableData:any;
    loadSearchTable(event,key,data) {
        if(event)
            event.preventDefault();
        this.checkAllSearch();
        this.searchTableData=data;
        if(this.model.rules[key].multiple){//TODO:Falta completar el comportamiento
            this.model.rules[key].paramsSearch.multiple=true;
            this.model.rules[key].paramsSearch.valuesData=[];
            this.model.rules[key].paramsSearch.valuesData = data[key];
            if(this.model.rules[key].paramsSearch.eval)
                eval(this.model.rules[key].paramsSearch.eval);
        }
        this.searchTable =  Object.assign({},this.model.rules[key].paramsSearch);
        this.searchTable.field =  key;

    }

    private checkAllSearch() {
        let that=this;
        Object.keys(this.instanceSearch).forEach(key=>{
            if(that.instanceSearch[key] && that.instanceSearch[key].dataList){
                that.instanceSearch[key].dataList={}
            }
        })
    }

    public modelSave:any={};
    loadSaveModal(event,key,data) {
        event.preventDefault();
        this.dataSelect=data;
    }

    getDataSave(data,key){
        this.model.onPatch(this.modelSave[key].key,this.dataSelect,data.id);
    }

    getDataSearch(data){
        this.model.onPatch(this.searchTable.field,this.searchTableData,data.id);
    }

    getDataSearchMultiple(data){
        this.model.onPatch(this.searchTable.field,this.searchTableData,data);
    }

    actionPermissionKey() {
        let data=[];
        let that=this;

        Object.keys(this.params.actions).forEach((key)=>
        {
            if(that.params.actions[key].permission)
                data.push(key);
        });

        return data;
    }

    getListObjectNotReferenceSave(){
        let that = this;
        Object.keys(this.model.rules).forEach(key=>{
            if(that.model.rules[key].object && !that.model.rules[key].reference && that.model.rules[key].permissions.add)
                that.modelSave[key]=that.model.rules[key];
        })
    }

    getBooleandData(key,data){
        let field = {'class':'btn btn-orange','text':'n/a','disabled':true};

        if( (!eval(this.model.rules[key].disabled || 'false')))
        {
            let index = this.model.rules[key].source.findIndex(obj => (obj.value == data[key] || obj.id == data[key]));
            if(index > -1)
            {
                this.model.rules[key].source[index].disabled=!this.model.rules[key].update;
                return this.model.rules[key].source[index];
            }
        }
        return field;

    }

    getDisabledField(key,data){
        return (eval(this.model.rules[key].disabled || 'false'));
    }

    public loadDataFieldReference(data,key,setNull=false){
        this.checkAllSearch();
        this.modelReference=Object.assign({},this.model.rules[key]);
        this.dataSelect = data;
        if(setNull)
            this.setDataFieldReference(data,true);

    }
    
    public setDataFieldReference(data,setNull=false) {
        let value=null;
        let that = this;

        if(!setNull)//no colocar valor nulo
        {
            value=this.dataSelect.id;
            if(that.dataSelect[that.modelReference.code]!=null && that.modelReference.unique)
                that.modelReference.model.setDataField(that.dataSelect[that.modelReference.code],that.model.ruleObject.key,null,that.modelReference.callback,that.dataSelect).then(
                    response=>{
                        that.modelReference.model.setDataField(data.id,that.model.ruleObject.key,value,that.modelReference.callback,that.dataSelect);
                    });
            else
                that.modelReference.model.setDataField(data.id,that.model.ruleObject.key,value,that.modelReference.callback,that.dataSelect);
        }
        else
            that.modelReference.model.setDataField(data[that.modelReference.code],that.model.ruleObject.key,null,that.modelReference.callback,data);

    }

    public formatDateId={};
    public dateHmanizer = StaticValues.dateHmanizer;
    public formatDate(date, format, force = false, id = null) {
        if (date) {
            if (id && this.formatDateId[id])
                force = this.formatDateId[id].value;
            if (this.db.myglobal.getParams(this.model.prefix + '_DATE_FORMAT_HUMAN') == 'true' && !force) {
                var diff = moment().valueOf() - moment(date).valueOf();
                if (diff < parseFloat(this.db.myglobal.getParams('DATE_MAX_HUMAN'))) {
                    if (diff < 1800000)//menor a 30min
                        return 'Hace ' + this.dateHmanizer(diff, {units: ['m', 's']})
                    if (diff < 3600000) //menor a 1hora
                        return 'Hace ' + this.dateHmanizer(diff, {units: ['m']})
                    return 'Hace ' + this.dateHmanizer(diff, {units: ['h', 'm']})
                }
            }
            return moment(date).format(format || 'DD/MM/YYYY');
        }
        return "-";
    }

    public formatTimeView(data) {
        if (data) {
            if (data < 1800000)//menor a 30min
                return this.dateHmanizer(data, {units: ['m', 's']});
            if (data < 3600000) //menor a 1hora
                return this.dateHmanizer(data, {units: ['m']});
            if(data < 86400000)
                return  this.dateHmanizer(data, {units: ['h', 'm']});

            return  this.dateHmanizer(data)
        }
        return '-'

    }

    public changeFormatDate(id) {
        if (!this.formatDateId[id])
            this.formatDateId[id] = {'value': false};
        this.formatDateId[id].value = !this.formatDateId[id].value;
    }

    public viewChangeDate(date) {
        //<i *ngIf="viewChangeDate(data.rechargeReferenceDate)" class="fa fa-exchange" (click)="changeFormatDate(data.id)"></i>
        var diff = moment().valueOf() - moment(date).valueOf();
        return ((diff < parseFloat(this.db.myglobal.getParams('DATE_MAX_HUMAN'))) && this.db.myglobal.getParams(this.model.prefix + '_DATE_FORMAT_HUMAN') == 'true')
    }

    public getTypeEval(key,data){
        if(this.model.rules[key])
            return eval(this.model.rules[key].eval);
    }

    public viewListData={};
    public setViewListData(event,data,key){
        let that=this;
        if(event)
            event.preventDefault();
        this.viewListData['title'] = this.model.rules[key].title;
        this.viewListData['label']={};
        if(data[key][0])
            Object.keys(data[key][0]).forEach(subkey=>{
                if(that.model.rules[key].rulesSave[subkey])
                    that.viewListData['label'][subkey] = that.model.rules[key].rulesSave[subkey].title;
            });
        this.viewListData['data'] =  data[key];
        if(typeof data[key] === 'string'){
            this.viewListData['data'] = JSON.parse(data[key])
        }
    }

    public getObjectKeys(data){
        return Object.keys(data || {});
    }

    changeOrder(sort){
        if(sort && this.model && this.model.rules[sort] && this.model.rules[sort].search){
            if(sort ==  this.model.rest.sort){
                if(this.model.rest.order == 'desc')
                    this.model.rest.order = 'asc';
                else{
                    this.model.rest.sort=null;
                    this.model.rest.order=null;
                }
            }
            else
            {
                this.model.rest.sort =  sort;
                this.model.rest.order = 'desc'
            }
            this.model.loadData();
        }
    }

    evalExp(data,exp){
        return eval(exp);
    }

}
