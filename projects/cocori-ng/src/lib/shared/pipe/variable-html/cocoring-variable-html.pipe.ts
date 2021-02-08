import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'variableHtml',
    pure: false
})
export class CocoringVariableHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }
    transform(texteHtml: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(texteHtml);
    }
}
