import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';

@Directive({
    selector: 'custom-router-outlet'
})

export class CustomRouterOutlet extends RouterOutlet {
    private parentRouter: Router;

    constructor(_elementRef: ViewContainerRef, _loader: DynamicComponentLoader, _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
        this.parentRouter = _parentRouter;
    }

    activate(instruction: ComponentInstruction) {
        console.log('activate');
        return super.activate(instruction);
    }

    deactivate(instruction: ComponentInstruction) {
        console.log('deactivate');
        //return super.deactivate(instruction);
        return null;
    }

    reuse(instruction: ComponentInstruction) {
        console.log('reuse');
        //return null;
        return super.activate(instruction);
    }
}