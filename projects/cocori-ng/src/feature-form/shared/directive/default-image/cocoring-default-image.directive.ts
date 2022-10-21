import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: 'img[default]',
})
export class CocoringDefaultImageDirective {
    @Input()
    default: string;

    @HostListener('error')
    onError() {
        this.src = this.default || "https://www.fortunehotels.in/images/404img.jpg";
    }

    @HostBinding('src')
    @Input()
    src: string;
}