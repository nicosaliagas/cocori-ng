import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { InputIconModule } from '../input-icon/input-icon.module';
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