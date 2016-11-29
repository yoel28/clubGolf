import {ElementRef, Directive, EventEmitter} from "@angular/core";
import {Control} from "@angular/common";

declare var jQuery:any;
@Directive({
    selector: "[color-picker]",
    inputs:['hex'],
    outputs:['color']
})
export class ColorPicker {
    public hide:any;
    public hex:Control;
    public color:any;

    constructor(public element:ElementRef) {
        this.hex = new Control('');
        this.color = new EventEmitter();
    }
    ngOnInit(){
        let that = this;

        jQuery(this.element.nativeElement).ColorPicker({
            color: that.hex.value,
            onShow: function (colpkr) {
                jQuery(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                that.color.emit(that.hex.value);
                jQuery(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                that.hex.updateValue(hex);
                jQuery(that.element.nativeElement).css('backgroundColor', '#' + that.hex.value);
                jQuery(that.element.nativeElement).val('#'+that.hex.value);
            }
        })
        jQuery(that.element.nativeElement).css('backgroundColor', '#' + that.hex.value);
        jQuery(that.element.nativeElement).val('#'+that.hex.value);
    }
}