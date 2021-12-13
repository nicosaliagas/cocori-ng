import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeUrl',
    pure: false
})
export class CocoringSanitizeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }
    transform(url: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
