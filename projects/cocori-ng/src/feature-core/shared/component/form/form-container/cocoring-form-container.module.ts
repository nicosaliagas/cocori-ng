import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CocoringButtonsGroupModule } from '../form-buttons/cocoring-buttons-group.module';
import { CocoringFormContainerComponent } from './cocoring-form-container.component';

@NgModule({
    declarations: [CocoringFormContainerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CocoringButtonsGroupModule
    ],
    exports: [CocoringFormContainerComponent]
})
export class CocoringFormContainerModule { }