import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CocoringInputErrorModule, CocoringVariableHtmlModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringConfirmModalComponent } from './cocoring-confirm-modal.component';

@NgModule({
    declarations: [
        CocoringConfirmModalComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        CocoringVariableHtmlModule,
        CocoringInputErrorModule,
    ],
    exports: [
        CocoringConfirmModalComponent,
    ]
})
export class CocoringConfirmModalModule { }