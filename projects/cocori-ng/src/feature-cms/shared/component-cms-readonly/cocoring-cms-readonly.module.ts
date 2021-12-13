import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CocoringVariableHtmlModule } from 'cocori-ng/src/feature-core';

import { SharedCMSModule } from '../shared-cms.module';
import {
    CocoringCmsReadonlySectionComponent,
} from './cocoring-cms-readonly-section/cocoring-cms-readonly-section.component';
import { CocoringCmsReadonlyComponent } from './cocoring-cms-readonly/cocoring-cms-readonly.component';

@NgModule({
    declarations: [
        CocoringCmsReadonlyComponent,
        CocoringCmsReadonlySectionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CocoringVariableHtmlModule,
        SharedCMSModule,
        FlexLayoutModule,
        MatIconModule
    ],
    exports: [
        CocoringCmsReadonlyComponent,
    ]
})
export class CocoringCmsReadonlyModule { }