import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[cocoring-previousPage]'
})
export class CocoringPreviousPageDirective {
    constructor(private location: Location) { }

    @HostListener('click')
    onClick() {
        this.location.back();
    }
}