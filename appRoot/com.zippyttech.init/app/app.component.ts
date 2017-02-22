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

declare var SystemJS: any;
var jQuery = require('jquery');

@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: 'index.html',
    styleUrls: ['style.css'],
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

        if(this.validToken()  && !this.db.myglobal.dataSesion.valid){
            this.goPage(null,'/init/load');
        }
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
                else if (localStorage.getItem('userTemp')){
                    if(componentName!='AccountSelectComponent' && componentName!='LoadComponent'){
                        that.db.myglobal.saveUrl = event.url;
                        let link = ['/auth/accountSelect', {}];
                        that.db.router.navigate(link);
                    }
                }
                else if (!isPublic && !that.db.myglobal.dataSesion.valid ) {
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

                if (that.db.myglobal.dataSesion.valid  && that.db.myglobal.getParams('VERSION_CACHE') != localStorage.getItem('VERSION_CACHE')) {
                    if(!localStorage.getItem('userTemp'))
                    {
                        localStorage.setItem('VERSION_CACHE', that.db.myglobal.getParams('VERSION_CACHE'));
                        location.reload(true);
                    }
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
        });
    }

    public ngAfterViewInit() {

    }

    ngDoCheck() {
        this.cdRef.detectChanges();
    }

    ngAfterContentChecked() {

    }
    public get sessionValid(){
        return this.db.myglobal.dataSesion.valid && !localStorage.getItem('userTemp');
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
            localStorage.removeItem('userTemp');
            localStorage.removeItem('accountList');
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
    public changeAccount(event){
        if(event)
            event.preventDefault();

        localStorage.setItem('userTemp','true');

        let link = ['/auth/accountSelect', {}];
        this.db.router.navigate(link);

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
                'icon': 'fa fa-dashboard',
                'title': 'Dashboard',
                'routerLink': '/init/dashboard'

            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_USER', 'MEN_ACL', 'MEN_PERMISSION', 'MEN_ROLE', 'MEN_ACCOUNT']),
                'icon': 'fa fa-unlock',
                'title': 'Acceso',
                'key': 'Acceso',
                'select': false,
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_USER']),
                        'icon': 'fa fa-user',
                        'title': 'Usuarios',
                        'routerLink': '/access/user'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_USERTYPE']),
                        'icon': 'fa fa-male',
                        'title': 'Tipos de usuarios',
                        'routerLink': '/access/user/type'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_USERSTATUS']),
                        'icon': 'fa fa-child',
                        'title': 'Estado de usuarios',
                        'routerLink': '/access/user/status'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_USERGROUP']),
                        'icon': 'fa fa-users',
                        'title': 'Grupo de usuarios',
                        'routerLink': '/access/user/group'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ACL']),
                        'icon': 'fa  fa-stack-overflow',
                        'title': 'ACL',
                        'routerLink': '/access/acl'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PERMISSION']),
                        'icon': 'fa fa-key',
                        'title': 'Permisos',
                        'routerLink': '/access/permission'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ROLE']),
                        'icon': 'fa  fa-unsorted',
                        'title': 'Roles',
                        'routerLink': '/access/role'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ACCOUNT']),
                        'icon': 'fa fa-star-o',
                        'title': 'Cuentas',
                        'routerLink': '/access/account'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_CONTRACT']),
                        'icon': 'fa  fa-edit',
                        'title': 'Contratos',
                        'routerLink': '/club/catalog/contract'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_EVENTS', 'MEN_INFO', 'MEN_PARAM', 'MEN_RULE', 'MEN_NOTIFICATION','MEN_CHANNEL']),
                'icon': 'fa fa-gears',
                'title': 'Configuración',
                'key': 'Configuracion',
                'select': false,
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_CHANNEL']),
                        'icon': 'fa fa-code-fork',
                        'title': 'Canales',
                        'routerLink': '/business/channel'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_EVENTS']),
                        'icon': 'fa fa-calendar',
                        'title': 'Eventos',
                        'routerLink': '/business/event'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_INFO']),
                        'icon': 'fa fa-file-word-o',
                        'title': 'Información',
                        'routerLink': '/business/info'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PARAM']),
                        'icon': 'fa fa-sliders',
                        'title': 'Parámetros',
                        'routerLink': '/business/param'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_RULE']),
                        'icon': 'fa fa-book',
                        'title': 'Reglas',
                        'routerLink': '/business/rule'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_NOTIFICATION']),
                        'icon': 'fa fa-bell-o',
                        'title': 'Notificaciones',
                        'routerLink': '/business/notify'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_PRODUCTTYPE','MEN_PRODUCT','MEN_STATE','MEN_QRCODE']),
                'icon': 'fa fa-newspaper-o',
                'title': 'Catálogo',
                'key': 'Catalogo',
                'select' : false,
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PRODUCTTYPE']),
                        'icon': 'fa fa-cart-plus',
                        'title': 'Tipo de producto',
                        'routerLink': '/club/catalog/type/product'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_PRODUCT']),
                        'icon': 'fa fa-cube',
                        'title': 'Producto',
                        'routerLink': '/club/catalog/product'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_STATE']),
                        'icon': 'fa fa-tasks',
                        'title': 'Estados',
                        'routerLink': '/club/catalog/status'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_QRCODE']),
                        'icon': 'fa fa-qrcode',
                        'title': 'Códigos QR',
                        'routerLink': '/club/catalog/qr'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_COMPANY']),
                        'icon': 'fa fa-industry',
                        'title': 'Empresas',
                        'routerLink': '/club/catalog/company'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_ANTENNA']),
                        'icon': 'fa  fa-wifi',
                        'title': 'Antenas',
                        'routerLink': '/club/catalog/antenna'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_LOCATION']),
                        'icon': 'fa fa-map-o',
                        'title': 'Ubicaciones',
                        'routerLink': '/club/catalog/location'
                    }
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_GENE_OUT','MEN_GETBACK','MEN_TRADE']),
                'icon': 'fa fa-wrench',
                'select' : false,
                'title': 'Operaciones',
                'key': 'Operaciones',
                'treeview': [
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_GENE_OUT']),
                        'icon': 'fa fa-qrcode',
                        'title': 'Generar salida',
                        'routerLink': '/club/process/generate/output'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_GETBACK']),
                        'icon': 'fa fa-download',
                        'title': 'Generar entrada',
                        'routerLink': '/club/process/getback'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_TRADE']),
                        'icon': 'glyphicon glyphicon-list-alt',
                        'title': 'Lista de Op.',
                        'routerLink': '/club/catalog/trade'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_RECORD']),
                        'icon': 'fa fa-file-text',
                        'title': 'Lista registro',
                        'routerLink': '/club/catalog/record'
                    }
                ]
            });
            this.menuItems.value.push({
                'visible': this.db.myglobal.existsPermission(['MEN_VEHICLE','MEN_VEHICLETYPE','MEN_MODEL','MEN_BRAND']),
                'icon': 'fa fa-car',
                'title': 'Vehículos',
                'key': 'vehicle',
                'select': false,
                'treeview': [

                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_TAG']),
                        'icon': 'fa fa-tags',
                        'title': 'Tag',
                        'routerLink': '/club/catalog/tag'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_VEHICLE']),
                        'icon': 'fa fa-bus',
                        'title': 'Vehículos',
                        'routerLink': '/club/catalog/vehicle'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_VEHICLETYPE']),
                        'icon': 'fa fa-truck',
                        'title': 'Tipos de veh.',
                        'routerLink': '/club/catalog/vehicle/type'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_MODEL']),
                        'icon': 'fa fa-taxi',
                        'title': 'Modelo de veh.',
                        'routerLink': '/club/catalog/vehicle/model'
                    },
                    {
                        'visible': this.db.myglobal.existsPermission(['MEN_BRAND']),
                        'icon': 'fa fa-bus',
                        'title': 'Marcas de veh.',
                        'routerLink': '/club/catalog/vehicle/brand'
                    }

                ]
            });
        }
    }

    getLocalStorage(item){
        return localStorage.getItem(item);
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

    goPage(event=null, url) {
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
    @HostListener('window:offline') offline() {
        this.addToast('Offline','Se a detectado un problema con el Internet, Por favor conectarse a la red','error');
    }
}
