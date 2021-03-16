import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { InputIconModule } from '../extend-inputs/input-icon/input-icon.module';
import { CocoringTextComponent } from './cocoring-text.component';

@NgModule({
    declarations: [
        CocoringTextComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CocoringInputErrorModule,
        InputIconModule
        ],
    exports: [CocoringTextComponent]
})
export class CocoringTextModule { }