import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CocoringVariableHtmlModule } from '@cocori-ng/lib/src/lib/feature-core';

import { SharedCMSModule } from '../shared-cms.module';
import { SectionsReadonlyTemplatesComponents } from './cocoring-cms-readonly-section-tpl';
import {
    CocoringCmsReadonlySectionComponent,
} from './cocoring-cms-readonly-section/cocoring-cms-readonly-section.component';
import { CocoringCmsReadonlyComponent } from './cocoring-cms-readonly/cocoring-cms-readonly.component';

@NgModule({
    declarations: [
        CocoringCmsReadonlyComponent,
        CocoringCmsReadonlySectionComponent,
        ...SectionsReadonlyTemplatesComponents
    ],
    imports: [
        CommonModule,
        FormsModule,
        CocoringVariableHtmlModule,
        SharedCMSModule,
        FlexLayoutModule,
    ],
    exports: [
        CocoringCmsReadonlyComponent,
    ]
})
export class CocoringCmsReadonlyModule { }