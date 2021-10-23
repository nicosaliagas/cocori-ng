import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CocoringInputErrorModule } from '@cocori-ng/lib/src/lib/feature-core';

import { InputIconModule } from '../extend-inputs/input-icon/input-icon.module';
import { CocoringDateComponent } from './cocoring-date.component';

@NgModule({
    declarations: [
        CocoringDateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CocoringInputErrorModule,
        InputIconModule,
    ],
    exports: [
        CocoringDateComponent,
    ]
})
export class CocoringDateModule { }