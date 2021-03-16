import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { InputIconModule } from '../extend-inputs/input-icon/input-icon.module';
import { CocoringTextareaComponent } from './cocoring-textarea.component';

@NgModule({
    declarations: [CocoringTextareaComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CocoringInputErrorModule,
        InputIconModule
        ],
    exports: [CocoringTextareaComponent]
})
export class CocoringTextareaModule { }