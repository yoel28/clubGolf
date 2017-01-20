import {Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentChecked, HostListener, DoCheck } from '@angular/core';
import {RestController} from "../../com.zippyttech.rest/restController";
import {RoutesRecognized, NavigationStart} from "@angular/router";
import {contentHeaders} from "../../com.zippyttech.rest/headers";
import {FormControl} from "@angular/forms";
import {componentsPublic} from "../../app-routing.module";
import {InfoModel} from "../../com.zippyttech.business/info/info.model";
import {AnimationsManager} from "../../com.zippyttech.ui/animations/AnimationsManager";
import {DependenciesBase} from "../../com.zippyttech.common/DependenciesBase";
import {UserModel} from "../../com.zippyttech.access/user/user.model";
import {AngularFire} from "angularfire2";
import {IModal} from "../../com.zippyttech.ui/components/modal/modal.component";

declare var jQuery: any;
declare var SystemJS: any;
@Component({
    selector: 'my-app',
    templateUrl: SystemJS.map.app + 'com.zippyttech.init/app/index.html',
    styleUrls: [SystemJS.map.app + 'com.zippyttech.init/app/style.css'],
    animations: AnimationsManager.getTriggers("d-fade|expand_down", 150)
})
export class AppComponent extends RestController implements OnInit,AfterViewInit,AfterContentChecked,DoCheck {

    public menuType: FormControl;
    public menuItems: FormControl;

    public activeMenuId: string;

    public info: any;
    public user: any;

    constructor(public db: DependenciesBase, private cdRef: ChangeDetectorRef,public af: AngularFire) {
        super(db);
        let url="https://cdg.zippyttech.com:8080";
        localStorage.setItem('urlAPI', url + '/api');
        localStorage.setItem('url', url);
        this.routerEvents();
    }

    ngOnInit(): void {
        this.menuType = new FormControl(null);
        this.menuItems = new FormControl([]);
        this.loadPublicData();
    }

    routerEvents(){
        let that = this;
        this.db.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                that.db.myglobal.navigationStart = true;
            }
            if (event instanceof RoutesRecognized) {
                that.db.myglobal.navigationStart = false;
                let componentName = event.state.root.children[0].component['name'];
                let isPublic = that.isPublic(componentName);

                if (isPublic && localStorage.getItem('bearer')) {
                    let link = ['/init/dashboard', {}];
                    if(componentName == 'TermConditionsComponent'){
                        jQuery('#termConditions').modal('show');
                    }
                    that.db.router.navigate(link);
                }
                else if (!isPublic && !that.db.myglobal.dataSesion.valid) {
                    let link: any;
                    if (localStorage.getItem('bearer')) {
                        if (componentName != 'LoadComponent') {
                            that.db.myglobal.saveUrl = event.url;
                            link = ['/init/load', {}];
                            that.db.router.navigate(link);
                        }
                    }
                    else {
                        that.db.myglobal.saveUrl = event.url;
                        link = ['/auth/login', {}];
                        that.db.router.navigate(link);
                    }
                }
                else if (that.db.myglobal.saveUrl && !isPublic) {
                    let link = [that.db.myglobal.saveUrl, {}];
                    that.db.myglobal.saveUrl = null;
                    that.db.router.navigate(link);
                }

                if (that.db.myglobal.dataSesion.valid && that.db.myglobal.getParams('VERSION_CACHE') != localStorage.getItem('VERSION_CACHE')) {
                    localStorage.setItem('VERSION_CACHE', that.db.myglobal.getParams('VERSION_CACHE'));
                    location.reload(true);
                }
            }
        });
    }

    initModels() {
        this.info = new InfoModel(this.db);
        this.info.rules['code'].readOnly = true;
        this.info.paramsSave.updateField = true;

        this.user = new UserModel(this.db);
        Object.keys(this.user.rulesSave).forEach(key=>{
            if(key!='email')
                delete this.user.rulesSave[key];
        })
    }

    public ngAfterViewInit() {

    }

    ngDoCheck() {
        this.cdRef.detectChanges();
    }

    ngAfterContentChecked() {

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        //TODO:Cambiar menu
        this.db.myglobal.visualData.height = event.target.innerWidth;
    }

    public isPublic(component: string) {
        return componentsPublic.indexOf(component) > -1 ? true : false;
    }

    public validToken(): boolean {
        return localStorage.getItem('bearer') ? true : false;
    }

    logout(event: Event) {
        event.preventDefault();
        let that = this;
        let successCallback = (response: any) => {
            this.db.myglobal.dataSesionInit();
            localStorage.removeItem('bearer');
            contentHeaders.delete('Authorization');
            that.af.auth.logout();
            this.menuItems.setValue([]);
            this.menuType.setValue(null);
            this.activeMenuId = "";
            let link = ['/auth/login', {}];
            that.db.router.navigate(link);
        };
        this.httputils.doPost('/logout', null, successCallback, this.error);

    }

    public replace(data: string): string {
        return data.replace(/;/g, ' ');
    }

    onProfile(event?: Event): void {
        if (event)
            event.preventDefault();
        let link = ['/access/user/profile', {}];
        this.db.router.navigate(link);

    }

    activeMenu(event, id) {

        this.menuItems.value.forEach((v) => {
            if (this.activeMenuId === v.key && this.activeMenuId !== id)
                v.select = false;

            if (id === v.key)
                v.select = !v.select;
        });

        if (event)
            event.preventDefault();

        if (this.activeMenuId == id) {
            this.activeMenuId = "";
        }
        else {
            this.activeMenuId = id;
        }

    }

    loadPage() {
        if (!this.menuType.value) {
            this.loadMenu();
            this.initModels();
            this.menuType.setValue({
                'list': this.db.myglobal.getParams('MENU_LIST') == '1' ? true : false,
                'modal': this.db.myglobal.getParams('MENU_MODAL') == '1' ? true : false,
            });

            if (!this.menuType.value.list) {
                jQuery('body').addClass('no-menu');
            }
        }
    }

    loadMenu() {
        if (this.menuItems.value && this.menuItems.value.length == 0) {

            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_DASHBOARD']),
                'icon': 'fa fa-dollar',
                'title': 'Dashboard',
                'routerLink': '/init/dashboard'

            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_USERS','MEN_ACL','MEN_PERM','MEN_ROLE','MEN_ACCOUNT','MEN_US_TYPE','MEN_CONT']),
                'icon': 'fa fa-gears',
                'title': 'Acceso',
                'key': 'Acceso',
                'select': false,
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_USERS']),
                        'icon': 'fa fa-user',
                        'title': 'Usuarios',
                        'routerLink': '/access/user'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_US_TYPE']),
                        'icon': 'fa fa-user',
                        'title': 'Tipos de usuarios',
                        'routerLink': '/access/user/type'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_USER_STATUS']),
                        'icon': 'fa fa-user',
                        'title': 'Estado de usuarios',
                        'routerLink': '/access/user/status'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ACL']),
                        'icon': 'fa fa-user',
                        'title': 'ACL',
                        'routerLink': '/access/acl'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PERM']),
                        'icon': 'fa fa-user',
                        'title': 'Permisos',
                        'routerLink': '/access/permission'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ROLE']),
                        'icon': 'fa fa-user',
                        'title': 'Roles',
                        'routerLink': '/access/role'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ACCOUNT']),
                        'icon': 'fa fa-building',
                        'title': 'Cuentas',
                        'routerLink': '/access/account'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_CONT']),
                        'icon': 'fa fa-user',
                        'title': 'Contratos',
                        'routerLink': '/club/catalog/contract'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_EVENT','MEN_INFO','MEN_PARAM','MEN_RULE','MEN_NOTIFY']),
                'icon': 'fa fa-gears',
                'title': 'Configuración',
                'key': 'Configuracion',
                'select': false,
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_EVENT']),
                        'icon': 'fa fa-user',
                        'title': 'Eventos',
                        'routerLink': '/business/event'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_INFO']),
                        'icon': 'fa fa-user',
                        'title': 'Información',
                        'routerLink': '/business/info'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PARAM']),
                        'icon': 'fa fa-user',
                        'title': 'Parámetros',
                        'routerLink': '/business/param'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_RULE']),
                        'icon': 'fa fa-user',
                        'title': 'Reglas',
                        'routerLink': '/business/rule'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_NOTIFY']),
                        'icon': 'fa fa-user',
                        'title': 'Notificaciones',
                        'routerLink': '/business/notification'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_PRTYPE','MEN_PROD','MEN_STATUS','MEN_QR']),
                'icon': 'fa fa-gears',
                'title': 'Catálogo',
                'key': 'Catalogo',
                'select' : false,
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PRTYPE']),
                        'icon': 'fa fa-list',
                        'title': 'Tipo de producto',
                        'routerLink': '/club/catalog/type/product'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PROD']),
                        'icon': 'fa fa-list',
                        'title': 'Producto',
                        'routerLink': '/club/catalog/product'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_STATUS']),
                        'icon': 'fa fa-list',
                        'title': 'Estados',
                        'routerLink': '/club/catalog/status'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_QR']),
                        'icon': 'fa fa-list',
                        'title': 'Códigos QR',
                        'routerLink': '/club/catalog/qr'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_COMPANY']),
                        'icon': 'fa fa-list',
                        'title': 'Empresas',
                        'routerLink': '/club/catalog/company'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ANTENNA']),
                        'icon': 'fa fa-list',
                        'title': 'Antenas',
                        'routerLink': '/club/catalog/antenna'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_LOCATION']),
                        'icon': 'fa fa-list',
                        'title': 'Ubicaciones',
                        'routerLink': '/club/catalog/location'
                    }
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_GENE_OUT','MEN_GETBACK','MEN_TRADE']),
                'icon': 'fa fa-gears',
                'select' : false,
                'title': 'Operaciones',
                'key': 'Operaciones',
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_GENE_OUT']),
                        'icon': 'fa fa-list',
                        'title': 'Generar salida',
                        'routerLink': '/club/process/generate/output'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_GETBACK']),
                        'icon': 'fa fa-list',
                        'title': 'Generar entrada',
                        'routerLink': '/club/process/getback'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_TRADE']),
                        'icon': 'fa fa-list',
                        'title': 'Lista de Op.',
                        'routerLink': '/club/catalog/trade'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_RECORD_LIST']),
                        'icon': 'fa fa-list',
                        'title': 'Lista registro',
                        'routerLink': '/club/catalog/record'
                    }

                ]
            });

            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_VEH','MEN_VEH_TYP','MEN_MODEL','MEN_BRAND']),
                'icon': 'fa fa-car',
                'title': 'Vehículos',
                'key': 'vehicle',
                'select': false,
                'treeview': [

                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_TAG']),
                        'icon': 'fa fa-list',
                        'title': 'Tag',
                        'routerLink': '/club/catalog/tag'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_VEH']),
                        'icon': 'fa fa-list',
                        'title': 'Vehículos',
                        'routerLink': '/club/catalog/vehicle'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_VEH_TYP']),
                        'icon': 'fa fa-list',
                        'title': 'Tipos de veh.',
                        'routerLink': '/club/catalog/vehicle/type'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_MODEL']),
                        'icon': 'fa fa-list',
                        'title': 'Modelo de veh.',
                        'routerLink': '/club/catalog/vehicle/model'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_BRAND']),
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
        menu.forEach(obj => {
            if (obj.visible)
                data.push(obj)
        });
        return data;
    }

    menuItemsTreeview(menu) {
        let data = [];
        let datatemp = [];
        menu.forEach(obj => {
            if (obj.treeview)
                data.push(obj);
            else
                datatemp.push(obj);
        });
        data.unshift({'icon': 'fa fa-gears', 'title': 'General', 'key': 'General', 'treeview': datatemp});
        return data;
    }

    setInstance(instance, prefix) {
        if (!this.db.myglobal.objectInstance[prefix])
            this.db.myglobal.objectInstance[prefix] = {};
        this.db.myglobal.objectInstance[prefix] = instance;
    }

    goPage(event, url) {
        if (event)
            event.preventDefault();
        let link = [url, {}];
        this.db.router.navigate(link);
    }
    public emailInstance:any;
    setEmailInstance(data){
        this.emailInstance = data;
    }
    validForm(){
        if(this.emailInstance && this.emailInstance.form && this.emailInstance.form.valid)
            return true;
        return false;
    }
    searchUser(event){
        if(event)
            event.preventDefault();

        let that = this;
        let body = this.emailInstance.getFormValues()
        let callback=(response)=>{
            let data=response.json();
            that.addToast('Notificación',data.message)
        };
        this.httputils.doPost('/invite',JSON.stringify(body),callback,this.error)
    }


    loadPublicData(){
        let that = this;
        let callback=(response)=>{
            Object.assign(that.db.myglobal.publicData,response.json());
        };
        this.httputils.doGet(localStorage.getItem('url'),callback,this.error,true)
    }

    getIModalTerm(){
        let iModalTerm:IModal = {
            id:'termConditions',
            header:{
                title:'Terminos y condiciones'
            },
            global:{
                size:'modal-lg'
            }
        };
        return iModalTerm;
    }
}
