import {ElementRef, Directive, EventEmitter, OnInit} from "@angular/core";
import {StaticValues} from "../catalog/staticValues";

var jQuery = require('jquery');
var cropit = require('cropit');

@Directive({
    selector: "[x-cropit]",
    inputs: ['imageSrc'],
    outputs: ['saveImagen'],
})
export class XCropit implements OnInit{
    public saveImagen:EventEmitter<string>;
    public imageSrc:string;
    public $element;

    constructor(public el:ElementRef) {
        this.saveImagen = new EventEmitter<string>();
        this.$element = jQuery(this.el.nativeElement);
    }
    ngOnInit() {
        this.applyCSS();
        this.$element.cropit({
            onImageLoaded:(event)=>{
                console.log(event);
                this.emit64();
            },
            onOffsetChange:(event)=>{
                console.log(event);
                this.emit64();
            },
            imageState: { src: this.imageSrc || StaticValues.pathElements.warning },
            imageBackground: true,
            imageBackgroundBorderWidth: 15
        });

        this.$element.find('.rotate-cw').click((event)=>{
            event.preventDefault();
            this.$element.cropit('rotateCW');
            this.emit64();
        });

        this.$element.find('.rotate-ccw').click((event)=>{
            event.preventDefault();
            this.$element.cropit('rotateCCW');
            this.emit64();
        });
    }

    private applyCSS(){
        this.$element.find('.cropit-preview-image-container').css({'cursor': 'move'});
        this.$element.find('.image-size-label').css({'margin-top': '10px'});
        this.$element.find('input, .export').css({'display':'block'});
        this.$element.find('button').css({'margin-top':'10px'});
        this.$element.find('.cropit-preview').css({
            'background-color': '#f8f8f8',
            'background-size': 'cover',
            'border': '1px solid #ccc',
            'border-radius': '3px',
            'margin-top': '7px',
            'width': '150px',
            'height': '150px',
        });
    }

    private emit64(){
        let imageData = this.$element.cropit('export');
        console.log({status:(imageData!=null),image:imageData});
        if(imageData)
            this.saveImagen.emit(imageData);
    }
}