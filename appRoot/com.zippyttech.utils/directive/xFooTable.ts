import {ElementRef, Directive} from "@angular/core";

declare let jQuery:any;

@Directive({
    selector: "[x-footable]"
})
export class XFooTable {
    constructor(el: ElementRef) {
        jQuery(el.nativeElement).footable({
            "Breakpoints": {
                "xs": 480,
                "sm": 768,
                "md": 992,
                "lg": 1200
            }

        });
        jQuery(el.nativeElement).bind('footable_breakpoint', function() {
            jQuery(el.nativeElement).trigger('footable_expand_first_row');
        }).footable();
    }
}