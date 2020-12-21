import { NgModule } from '@angular/core';

import { TerminalCodePreviewComponent } from './component/terminal-code-preview/terminal-code-preview.component';

export const ImportsFormComponents: any[] = [
    TerminalCodePreviewComponent
];

@NgModule({
    declarations: [
        ...ImportsFormComponents,
    ],
    imports: [
    ],
    exports: [
        ...ImportsFormComponents,
    ]
})
export class SharedProjectModule { }