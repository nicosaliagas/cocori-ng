import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { CocoringSlideToggleComponent } from './cocoring-slide-toggle.component';

@NgModule({
    declarations: [
        CocoringSlideToggleComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        CocoringInputErrorModule,
    ],
    exports: [
        CocoringSlideToggleComponent,
    ]
})
export class CocoringSlideToggleModule { }