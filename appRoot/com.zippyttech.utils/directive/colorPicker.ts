import {ElementRef, EventEmitter, Directive, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

declare var jQuery:any;
@Directive({
    selector: "[color-picker]",
    inputs:['hex'],
    outputs:['color']
})
export class ColorPicker implements OnInit{
    public hide:any;
    public hex:FormControl;
    public color:any;

    constructor(public element:ElementRef) {
        this.hex = new FormControl('');
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
                that.hex.setValue(hex);
                jQuery(that.element.nativeElement).css('backgroundColor', '#' + that.hex.value);
                jQuery(that.element.nativeElement).val('#'+that.hex.value);
            }
        })
        jQuery(that.element.nativeElement).css('backgroundColor', '#' + that.hex.value);
        jQuery(that.element.nativeElement).val('#'+that.hex.value);
    }
}