import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { CocoringNumberComponent } from './cocoring-number.component';

@NgModule({
    declarations: [
        CocoringNumberComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CocoringInputErrorModule,
        ],
    exports: [
        CocoringNumberComponent,
    ]
})
export class CocoringNumberModule { }