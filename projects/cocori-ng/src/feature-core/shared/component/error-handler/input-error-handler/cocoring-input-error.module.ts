import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CocoringInputErrorComponent } from './cocoring-input-error.component';

@NgModule({
    declarations: [CocoringInputErrorComponent],
    imports: [
        CommonModule,
        MatFormFieldModule
    ],
    exports: [CocoringInputErrorComponent]
})
export class CocoringInputErrorModule { }