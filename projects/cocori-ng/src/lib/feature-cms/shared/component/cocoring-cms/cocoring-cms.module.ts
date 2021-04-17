import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CocoringVariableHtmlModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringCmsBlocksCatalogComponent } from '../cocoring-cms-blocks-catalog/cocoring-cms-blocks-catalog.component';
import { CocoringCmsSectionComponent } from '../cocoring-cms-section/cocoring-cms-section.component';
import { CocoringToolbarCmsComponent } from '../cocoring-toolbar-cms/cocoring-toolbar-cms.component';
import { CocoringCmsComponent } from './cocoring-cms.component';

@NgModule({
    declarations: [
        CocoringCmsComponent,
        CocoringCmsBlocksCatalogComponent,
        CocoringCmsSectionComponent,
        CocoringToolbarCmsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatIconModule,
        FlexLayoutModule,
        CocoringVariableHtmlModule
    ],
    exports: [
        CocoringCmsComponent,
    ],
})
export class CocoringCMSModule { }