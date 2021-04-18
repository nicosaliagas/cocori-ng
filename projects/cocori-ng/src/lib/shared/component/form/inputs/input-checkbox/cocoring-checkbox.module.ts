import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CocoringInputErrorModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringCheckboxComponent } from './cocoring-checkbox.component';

@NgModule({
    declarations: [
        CocoringCheckboxComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        CocoringInputErrorModule,
    ],
    exports: [
        CocoringCheckboxComponent,
    ]
})
export class CocoringCheckboxModule { }