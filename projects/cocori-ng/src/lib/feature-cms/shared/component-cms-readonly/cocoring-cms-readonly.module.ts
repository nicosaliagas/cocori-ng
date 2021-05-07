import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

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
        FlexLayoutModule,
    ],
    exports: [
        CocoringCmsReadonlyComponent,
    ]
})
export class CocoringCmsReadonlyModule { }