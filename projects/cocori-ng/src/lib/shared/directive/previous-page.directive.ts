import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[previousPage]'
})
export class PreviousPageDirective {
    constructor(private location: Location) { }

    @HostListener('click')
    onClick() {
        this.location.back();
    }
}