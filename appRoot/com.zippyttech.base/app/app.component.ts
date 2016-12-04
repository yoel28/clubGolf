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

declare var jQuery:any;
declare var SystemJS:any;
@Component({
    selector: 'my-app',
    templateUrl: SystemJS.map.app+'com.zippyttech.base/app/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.base/app/style.css'],
})
export class AppComponent extends RestController implements OnInit,AfterViewInit,AfterContentChecked,DoCheck{
    public pathElement = StaticValues.pathElements;

    public menuType:FormControl;
    public menuItems:FormControl;

    public activeMenuId: string;

    constructor(public router: Router, http: Http, public myglobal: globalService,private cdRef:ChangeDetectorRef) {
        super(http);

        let that = this;
        let url = "http://vertedero.aguaseo.com:8080";

        localStorage.setItem('urlAPI', url + '/api');
        localStorage.setItem('url', url);

        router.events.subscribe((event: any) => {
            if (event instanceof RoutesRecognized) {
                let componentName =  event.state.root.children[0].component['name'];
                let isPublic = that.isPublic(componentName);

                if (isPublic && that.myglobal.dataSesion.valid) {
                    let link = ['/dashboard', {}];
                    that.router.navigate(link);
                }
                else if (!isPublic && !that.myglobal.dataSesion.valid) {
                    let link:any;
                    if(localStorage.getItem('bearer')){
                        if(componentName!='LoadComponent')
                        {
                            that.myglobal.saveUrl = event.url;
                            link = ['/auth/load', {}];
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
    public ngAfterViewInit() {

    }
    ngDoCheck(){

    }
    ngAfterContentChecked(){
        this.cdRef.detectChanges();
    }
    @HostListener('window:resize') onResize() {
        //TODO:Cambiar menu
    }

    public urlPublic = ['LoginComponent', 'ActivateComponent', 'RecoverComponent', 'RecoverPasswordComponent'];

    public isPublic(component: string) {
        let index = this.urlPublic.indexOf(component);
        if (index > -1)
            return true;
        return false;
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
        let link = ['/user/profile', {}];
        this.router.navigate(link);

    }

    activeMenu(event, id) {
        if(event)
            event.preventDefault();
        if (this.activeMenuId == id)
            this.activeMenuId = "";
        else
            this.activeMenuId = id;
    }
    loadPage() {
        if(!this.menuType.value)
        {
            this.loadMenu();
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
        if (this.menuItems.value.length == 0) {

            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_DASHBOARD']),
                'icon': 'fa fa-dollar',
                'title': 'Dashboard',
                'routerLink': '/dashboard'
            });
            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_ACL','MEN_PERMISOS','MEN_ROLES']),
                'icon': 'fa fa-gears',
                'title': 'Acceso',
                'key': 'Acceso',
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(["MEN_ACL"]),
                        'icon': 'fa fa-user',
                        'title': 'ACL',
                        'routerLink': '/auth/acl'
                    },
                    {
                        'visible': this.myglobal.existsPermission(["MEN_PERMISOS"]),
                        'icon': 'fa fa-user',
                        'title': 'Permisos',
                        'routerLink': 'Permission'
                    },
                    {
                        'visible': this.myglobal.existsPermission(["MEN_ROLES"]),
                        'icon': 'fa fa-user',
                        'title': 'Roles',
                        'routerLink': 'Role'
                    },
                ]
            });
            this.menuItems.value.push({
                'visible': this.myglobal.existsPermission(['MEN_EVENT','MEN_INFO','MEN_PARAM','MEN_RULE']),
                'icon': 'fa fa-gears',
                'title': 'Configuración',
                'key': 'Configuracion',
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(['MEN_EVENT']),
                        'icon': 'fa fa-user',
                        'title': 'Eventos',
                        'routerLink': 'Event'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_INFO']),
                        'icon': 'fa fa-user',
                        'title': 'Información',
                        'routerLink': 'Info'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_PARAM']),
                        'icon': 'fa fa-user',
                        'title': 'Parametros',
                        'routerLink': 'Param'
                    },
                    {
                        'visible': this.myglobal.existsPermission(['MEN_RULE']),
                        'icon': 'fa fa-user',
                        'title': 'Reglas',
                        'routerLink': 'Rule'
                    },
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
                data.push(obj)
            else
                datatemp.push(obj)
        })
        data.unshift({'icon': 'fa fa-gears', 'title': 'General', 'key': 'General', 'treeview': datatemp})
        return data;
    }
}
