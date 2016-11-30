import {Component, OnInit} from '@angular/core';
import {RestController} from "../../com.zippyttech.rest/restController";
import {StaticValues} from "../../com.zippyttech.utils/catalog/staticValues";
import {Router, RoutesRecognized} from "@angular/router";
import {Http} from "@angular/http";
import {globalService} from "../../com.zippyttech.utils/globalService";
import {contentHeaders} from "../../com.zippyttech.rest/headers";

declare var jQuery:any;
declare var SystemJS:any;
@Component({
    selector: 'my-app',
    templateUrl: SystemJS.map.app+'com.zippyttech.base/app/index.html',
    styleUrls: [ SystemJS.map.app+'com.zippyttech.base/app/style.css'],
})
export class AppComponent extends RestController implements OnInit {
    public pathElement = StaticValues.pathElements;

    public menu_modal:string;
    public menu_list:string;

    public saveUrl: string;
    public menuItems = [];
    public activeMenuId: string;

    constructor(public router: Router, http: Http, public myglobal: globalService) {
        super(http);
        //let url="https://club-golf.herokuapp.com";
        //let url="http://pescadorj:8080";
        let url = "https://dev.aguaseo.com:8080";
        //let url="http://192.168.1.124:8080";
        localStorage.setItem('urlAPI', url + '/api');
        localStorage.setItem('url', url);
        let that = this;
        router.events.subscribe((event: any) => {
            if (event instanceof RoutesRecognized) {
                let isPublic = that.isPublic(event.state.root.children[0].component['name']);
                if (isPublic && !localStorage.getItem('bearer')) {
                    that.myglobal.init=true;
                }
                else if (isPublic && localStorage.getItem('bearer')) {
                    let link = ['/dashboard', {}];
                    that.router.navigate(link);
                }
                else if (!isPublic && !localStorage.getItem('bearer')) {
                    that.saveUrl = event.url;
                    let link = ['/auth/login', {}];
                    that.router.navigate(link);
                }
                else if (that.saveUrl) {
                    let link = [that.saveUrl, {}];
                    that.saveUrl = null;
                    that.router.navigate(link);
                }

                if (that.myglobal.getParams('VERSION_CACHE') != localStorage.getItem('VERSION_CACHE') && (that.myglobal.init && localStorage.getItem('bearer'))) {
                    localStorage.setItem('VERSION_CACHE', that.myglobal.getParams('VERSION_CACHE'));
                    location.reload(true);
                }
            }
        });
    }

    public urlPublic = ['LoginComponent', 'ActivateComponent', 'RecoverComponent', 'RecoverPasswordComponent'];

    public isPublic(url: string) {
        let index = this.urlPublic.findIndex(obj => obj == url);
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
            this.myglobal.init= false;
            localStorage.removeItem('bearer');
            contentHeaders.delete('Authorization');
            this.menuItems = [];
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
        this.menu_modal = this.myglobal.getParams('MENU_MODAL');
        this.menu_list = this.myglobal.getParams('MENU_LIST');
        this.loadMenu();

        if (this.menu_list != '' && this.menu_list != '1') {
            jQuery('body').addClass('no-menu');
        }
    }
    loadMenu() {
        if (this.menuItems.length == 0) {
            this.menuItems.push({
                'visible': this.myglobal.existsPermission(['MEN_DASHBOARD']),
                'icon': 'fa fa-dollar',
                'title': 'Dashboard',
                'routerLink': 'Dashboard'
            });
            this.menuItems.push({
                'visible': this.myglobal.existsPermission(['MEN_ACL','MEN_PERMISOS','MEN_ROLES']),
                'icon': 'fa fa-gears',
                'title': 'Acceso',
                'key': 'Acceso',
                'treeview': [
                    {
                        'visible': this.myglobal.existsPermission(["MEN_ACL"]),
                        'icon': 'fa fa-user',
                        'title': 'ACL',
                        'routerLink': 'Acl'
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
            this.menuItems.push({
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
