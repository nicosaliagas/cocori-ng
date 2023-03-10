import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { CocoringSidenavItemComponent } from './component/sidenav/sidenav-item/cocoring-sidenav-item.component';
import { TerminalCodePreviewComponent } from './component/terminal-code-preview/terminal-code-preview.component';

export const ImportsFormComponents: any[] = [
    TerminalCodePreviewComponent,
    CocoringSidenavItemComponent
];

@NgModule({
    declarations: [
        ...ImportsFormComponents,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatListModule,
        MatIconModule,
    ],
    exports: [
        ...ImportsFormComponents,
    ]
})
export class SharedProjectModule { }