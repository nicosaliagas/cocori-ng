import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CocoringVariableHtmlModule } from '../../../pipe/variable-html/cocoring-variable-html.module';
import { CocoringInputErrorModule } from '../../error-handler/input-error-handler/cocoring-input-error.module';
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