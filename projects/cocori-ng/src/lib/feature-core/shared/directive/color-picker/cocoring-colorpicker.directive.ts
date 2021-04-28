import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

declare var ColorPicker: any

/** doc du plugin Js : https://www.cssscript.com/chrome-devtools-color-picker/ */

@Directive({
    selector: '[cocoring-colorpicker]',
})
export class CocoringColorpickerDirective implements AfterViewInit {

    @Input('cocoring-colorpicker') color!: string

    @Output('onColorChange') colorChangeEmitter: EventEmitter<string> = new EventEmitter();

    defaultColor: string = '#1ddaf7';

    /**
     * The directive's constructor
     */
    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
    ) { }

    ngAfterViewInit() {
        const elem = this.elementRef.nativeElement;

        let picker = new ColorPicker(elem, this.color ? this.color : this.defaultColor);

        fromEvent(elem, 'colorChange').pipe(
            debounceTime(400),
            map((event: any) => event.detail.color)
        ).subscribe((color: string) => {
            this.colorChangeEmitter.emit(color);
        });

        // elem.addEventListener('colorChange', (event: any) => {
        //     this.colorChangeEmitter.emit(event.detail.color);
        // });
    }

    @HostListener("click", ["$event"])
    public onClick(event: any): void {
        event.stopPropagation();
    }
}