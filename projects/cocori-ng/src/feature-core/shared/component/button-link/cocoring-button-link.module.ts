import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CocoringButtonModule } from '../button/cocoring-button.module';
import { CocoringButtonLinkComponent } from './cocoring-button-link.component';

@NgModule({
    declarations: [CocoringButtonLinkComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        CocoringButtonModule,
    ],
    exports: [CocoringButtonLinkComponent]
})
export class CocoringButtonLinkModule { }