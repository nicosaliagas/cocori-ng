import { NgModule } from '@angular/core';

import { CocoringSanitizeUrlPipe } from './cocoring-sanitize-url.pipe';

@NgModule({
    declarations: [CocoringSanitizeUrlPipe],
    imports: [],
    exports: [CocoringSanitizeUrlPipe]
})
export class CocoringSanitizeUrlModule { }