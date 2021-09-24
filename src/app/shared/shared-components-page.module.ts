import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { FabButtonComponent } from './component/fab-button/fab-button.component';

export const ImportsComponents: any[] = [
    FabButtonComponent,
];

@NgModule({
    declarations: [
        ...ImportsComponents,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        ...ImportsComponents,
    ]
})
export class SharedComponentsPageModule { }