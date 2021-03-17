import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CocoringButtonComponent } from './cocoring-button.component';

@NgModule({
    declarations: [CocoringButtonComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [CocoringButtonComponent]
})
export class CocoringButtonModule { }