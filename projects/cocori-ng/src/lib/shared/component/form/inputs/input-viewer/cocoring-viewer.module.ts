import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CocoringInputErrorModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringViewerComponent } from './cocoring-viewer.component';

@NgModule({
    declarations: [CocoringViewerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CocoringInputErrorModule,
    ],
    exports: [CocoringViewerComponent]
})
export class CocoringViewerModule { }