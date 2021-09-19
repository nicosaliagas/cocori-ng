import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CocoringInputErrorModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringCheckboxIndeterminateComponent } from './checkbox-indeterminate.component';

@NgModule({
    declarations: [
        CocoringCheckboxIndeterminateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        CocoringInputErrorModule,
    ],
    exports: [
        CocoringCheckboxIndeterminateComponent,
    ]
})
export class CocoringCheckboxIndeterminateModule { }