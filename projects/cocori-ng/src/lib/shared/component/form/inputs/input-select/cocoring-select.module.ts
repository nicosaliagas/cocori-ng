import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CocoringInputErrorModule } from '@cocori-ng/lib/src/lib/feature-core';

import { InputIconModule } from '../extend-inputs/input-icon/input-icon.module';
import { CocoringSelectComponent } from './cocoring-select.component';

@NgModule({
    declarations: [CocoringSelectComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        CocoringInputErrorModule,
        InputIconModule,
    ],
    exports: [CocoringSelectComponent]
})
export class CocoringSelectModule { }