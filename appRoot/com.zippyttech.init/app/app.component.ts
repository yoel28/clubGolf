import {
    Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentChecked, HostListener,
    DoCheck
} from '@angular/core';
import {RestController} from "../../com.zippyttech.rest/restController";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";
import {Router, RoutesRecognized} from "@angular/router";
import {Http} from "@angular/http";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {contentHeaders} from "../../com.zippyttech.rest/headers";
import {FormControl} from "@angular/forms";
import {componentsPublic} from "../../app-routing.module";
import {InfoModel} from "../../com.zippyttech.business/info/info.model";
import {ToastyService, ToastyConfig} from "ng2-toasty";
import {AnimationsManager} from "../../com.zippyttech.ui/animations/AnimationsManager";

declare var jQuery:any;
declare var SystemJS:any;
@Component({
    selector: 'my-app',
    templateUrl: SystemJS.map.app+'com.zippyttech.init/app/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.init/app/style.css'],
    animations: AnimationsManager.getTriggers("d-fade|expand_down",150)
})
export class AppComponent extends RestController implements OnInit,AfterViewInit,AfterContentChecked,DoCheck{
    public pathElement = StaticValues.pathElements;

    public menuType:FormControl;
    public menuItems:FormControl;

    public activeMenuId: string;

    public info:any;

    constructor(public router: Router, http: Http, public myglobal: globalService,private cdRef:ChangeDetectorRef,public toastyService:ToastyService,public toastyConfig:ToastyConfig) {
        super(http,toastyService,toastyConfig);

        let that = this;
        let url="https://cdg.zippyttech.com:8080";
        //let url="http://pescadorj:8080";
        //let url="https://club-golf.herokuapp.com";

        localStorage.setItem('urlAPI', url + '/api');
        localStorage.setItem('url', url);

        router.events.subscribe((event: any) => {
            if (event instanceof RoutesRecognized) {
                let componentName =  event.state.root.children[0].component['name'];
                let isPublic = that.isPublic(componentName);

                if (isPublic && that.myglobal.dataSesion.valid) {
                    let link = ['/init/dashboard', {}];
                    that.router.navigate(link);
                }
                else if (!isPublic && !that.myglobal.dataSesion.valid) {
                    let link:any;
                    if(localStorage.getItem('bearer')){
                        if(componentName!='LoadComponent')
                        {
                            that.myglobal.saveUrl = event.url;
                            link = ['/init/load', {}];
                            that.router.navigate(link);
                        }
                    }
                    else{
                        that.myglobal.saveUrl = event.url;
                        link = ['/auth/login', {}];
                        that.router.navigate(link);
                    }
                }
                else if (that.myglobal.saveUrl && !isPublic) {
                    let link = [that.myglobal.saveUrl, {}];
                    that.myglobal.saveUrl = null;
                    that.router.navigate(link);
                }

                if (that.myglobal.dataSesion.valid && that.myglobal.getParams('VERSION_CACHE') != localStorage.getItem('VERSION_CACHE')) {
                    localStorage.setItem('VERSION_CACHE', that.myglobal.getParams('VERSION_CACHE'));
                    location.reload(true);
                }
            }
        });
    }

    ngOnInit():void{
        this.menuType=new FormControl(null);
        this.menuItems=new FormControl([]);
    }
    initModels(){
        this.info = new InfoModel(this.myglobal);
        this.info.rules['code'].readOnly=true;
        this.info.paramsSave.updateField=true;
    }
    public ngAfterViewInit() {

    }
    ngDoCheck(){
        this.cdRef.detectChanges();
    }
    ngAfterContentChecked(){

    }

    @HostListener('window:resize' , ['$event'])
    onResize(event) {
        //TODO:Cambiar menu
        this.myglobal.visualData.height = event.target.innerWidth;
    }

    public isPublic(component: string) {
        return componentsPublic.indexOf(component)>-1?true:false;
    }

    public validToken(): boolean {
        return localStorage.getItem('bearer')?true:false;
    }

    logout(event: Event) {
        event.preventDefault();
        let that = this;
        let successCallback = (response: any) => {
            this.myglobal.dataSesionInit();
            localStorage.removeItem('bearer');
            contentHeaders.delete('Authorization');
            this.menuItems.setValue([]);
            this.menuType.setValue(null);
            this.activeMenuId = "";
            let link = ['/auth/login', {}];
            this.router.navigate(link);
        };
        this.httputils.doPost('/logout', null, successCallback, this.error);

    }

    public replace(data: string): string {
        return data.replace(/;/g, ' ');
    }

    onProfile(event?:Event):void {
        if(event)
            event.preventDefault();
        let link = ['/access/user/profile', {}];
        this.router.navigate(link);

    }

    activeMenu(event, id) {

        this.menuItems.value.forEach((v)=>
        {
            if(this.activeMenuId === v.key && this.activeMenuId !== id)
                v.select = false;

            if(id === v.key)
                v.select = !v.select;
        });

        if(event)
            event.preventDefault();

        if (this.activeMenuId == id) {
            this.activeMenuId = "";
        }
        else {
            this.activeMenuId = id;
        }

    }
    loadPage() {
        if(!this.menuType.value)
        {
            this.loadMenu();
            this.initModels();
            this.menuType.setValue({
                'list':this.myglobal.getParams('MENU_LIST')=='1'?true:false,
                'modal':this.myglobal.getParams('MENU_MODAL')=='1'?true:false,
            });

            if (!this.menuType.value.list) {
                jQuery('body').addClass('no-menu');
            }
        }
    }
    loadMenu() {
        if (this.menuItems.value && this.menuItems.value.length == 0) {

            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_DASHBOARD']),
                'icon': 'fa fa-dollar',
                'title': 'Dashboard',
                'routerLink': '/init/dashboard'

            });
            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_USERS','MEN_ACL','MEN_PERM','MEN_ROLE','MEN_ACCOUNT','MEN_US_TYPE','MEN_CONT']),
                'icon': 'fa fa-gears',
                'title': 'Acceso',
                'key': 'Acceso',
                'select' : false,
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(['MEN_USERS']),
                        'icon': 'fa fa-user',
                        'title': 'Usuarios',
                        'routerLink': '/access/user'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_US_TYPE']),
                        'icon': 'fa fa-user',
                        'title': 'Tipos de usuarios',
                        'routerLink': '/access/user/type'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_USER_STATUS']),
                        'icon': 'fa fa-user',
                        'title': 'Estatus de usuarios',
                        'routerLink': '/access/user/status'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_ACL']),
                        'icon': 'fa fa-user',
                        'title': 'ACL',
                        'routerLink': '/access/acl'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_PERM']),
                        'icon': 'fa fa-user',
                        'title': 'Permisos',
                        'routerLink': '/access/permission'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_ROLE']),
                        'icon': 'fa fa-user',
                        'title': 'Roles',
                        'routerLink': '/access/role'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_ACCOUNT']),
                        'icon': 'fa fa-building',
                        'title': 'Cuentas',
                        'routerLink': '/access/account'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_CONT']),
                        'icon': 'fa fa-user',
                        'title': 'Contratos',
                        'routerLink': '/club/catalog/contract'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_EVENT','MEN_INFO','MEN_PARAM','MEN_RULE']),
                'icon': 'fa fa-gears',
                'title': 'Configuración',
                'key': 'Configuracion',
                'select' : false,
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(['MEN_EVENT']),
                        'icon': 'fa fa-user',
                        'title': 'Eventos',
                        'routerLink': '/business/event'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_INFO']),
                        'icon': 'fa fa-user',
                        'title': 'Información',
                        'routerLink': '/business/info'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_PARAM']),
                        'icon': 'fa fa-user',
                        'title': 'Parametros',
                        'routerLink': '/business/param'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_RULE']),
                        'icon': 'fa fa-user',
                        'title': 'Reglas',
                        'routerLink': '/business/rule'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_PRTYPE','MEN_PROD','MEN_STATUS','MEN_QR']),
                'icon': 'fa fa-gears',
                'title': 'Catalogo',
                'key': 'Catalogo',
                'select' : false,
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(['MEN_PRTYPE']),
                        'icon': 'fa fa-list',
                        'title': 'Tipo de producto',
                        'routerLink': '/club/catalog/type/product'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_PROD']),
                        'icon': 'fa fa-list',
                        'title': 'Producto',
                        'routerLink': '/club/catalog/product'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_STATUS']),
                        'icon': 'fa fa-list',
                        'title': 'Estados',
                        'routerLink': '/club/catalog/status'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_QR']),
                        'icon': 'fa fa-list',
                        'title': 'QR Codigos',
                        'routerLink': '/club/catalog/qr'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_COMPANY']),
                        'icon': 'fa fa-list',
                        'title': 'Empresas',
                        'routerLink': '/club/catalog/company'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_ANTENNA']),
                        'icon': 'fa fa-list',
                        'title': 'Antenas',
                        'routerLink': '/club/catalog/antenna'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_LOCATION']),
                        'icon': 'fa fa-list',
                        'title': 'Ubicaciones',
                        'routerLink': '/club/catalog/location'
                    }
                ]
            });
            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_GENE_OUT','MEN_GETBACK','MEN_TRADE']),
                'icon': 'fa fa-gears',
                'select' : false,
                'title': 'operaciones',
                'key': 'Operaciones',
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(['MEN_GENE_OUT']),
                        'icon': 'fa fa-list',
                        'title': 'Generar salida',
                        'routerLink': '/club/process/generate/output'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_GETBACK']),
                        'icon': 'fa fa-list',
                        'title': 'Generar entrada',
                        'routerLink': '/club/process/getback'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_TRADE']),
                        'icon': 'fa fa-list',
                        'title': 'Lista de Op.',
                        'routerLink': '/club/catalog/trade'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_RECORD_IN_OUT']),
                        'icon': 'fa fa-list',
                        'title': 'Registro de acceso',
                        'routerLink': '/club/process/record'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_RECORD_LIST']),
                        'icon': 'fa fa-list',
                        'title': 'Lista registro',
                        'routerLink': '/club/catalog/record'
                    }

                ]
            });

            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_VEH','MEN_VEH_TYP','MEN_MODEL','MEN_BRAND']),
                'icon': 'fa fa-car',
                'title': 'Vehículos',
                'key': 'vehicle',
                'select': false,
                'treeview': [

                    {
                        'visible': this.myglobal.existsPermission(['MEN_TAG']),
                        'icon': 'fa fa-list',
                        'title': 'Tag',
                        'routerLink': '/club/catalog/tag'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_VEH']),
                        'icon': 'fa fa-list',
                        'title': 'Vehículos',
                        'routerLink': '/club/catalog/vehicle'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_VEH_TYP']),
                        'icon': 'fa fa-list',
                        'title': 'Tipos de veh.',
                        'routerLink': '/club/catalog/vehicle/type'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_MODEL']),
                        'icon': 'fa fa-list',
                        'title': 'Modelo de veh.',
                        'routerLink': '/club/catalog/vehicle/model'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_BRAND']),
                        'icon': 'fa fa-list',
                        'title': 'Marcas de veh.',
                        'routerLink': '/club/catalog/vehicle/brand'
                    }

                ]
            });
        }
    }

    menuItemsVisible(menu) {
        let data = [];
        menu.forEach(obj=> {
            if (obj.visible)
                data.push(obj)
        });
        return data;
    }

    menuItemsTreeview(menu) {
        let data = [];
        let datatemp = [];
        menu.forEach(obj=> {
            if (obj.treeview)
                data.push(obj);
            else
                datatemp.push(obj);
        });
        data.unshift({'icon': 'fa fa-gears', 'title': 'General', 'key': 'General', 'treeview': datatemp});
        return data;
    }

    setInstance(instance, prefix) {
        if (!this.myglobal.objectInstance[prefix])
            this.myglobal.objectInstance[prefix] = {};
        this.myglobal.objectInstance[prefix] = instance;
    }
    goPage(event,url){
        if(event)
            event.preventDefault();
        let link = [url, {}];
        this.router.navigate(link);
    }
}
