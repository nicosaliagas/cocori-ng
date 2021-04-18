import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CocoringInputErrorModule } from '@cocori-ng/lib/src/lib/feature-core';

import { InputIconModule } from '../extend-inputs/input-icon/input-icon.module';
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
        InputIconModule,
    ],
    exports: [
        CocoringNumberComponent,
    ]
})
export class CocoringNumberModule { }