import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CocoringVariableHtmlModule, CocoringWysiwygModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringCmsBlocksCatalogComponent } from '../cocoring-cms-blocks-catalog/cocoring-cms-blocks-catalog.component';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';
import { CocoringCmsSectionComponent } from '../cocoring-cms-section/cocoring-cms-section.component';
import { CocoringToolbarCmsComponent } from '../cocoring-toolbar-cms/cocoring-toolbar-cms.component';
import { CocoringCmsComponent } from './cocoring-cms.component';

@NgModule({
    declarations: [
        CocoringCmsComponent,
        CocoringCmsBlocksCatalogComponent,
        CocoringCmsSectionComponent,
        CocoringCmsSectionActionsComponent,
        CocoringToolbarCmsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        CocoringVariableHtmlModule,
        CocoringWysiwygModule
    ],
    exports: [
        CocoringCmsComponent,
    ],
})
export class CocoringCMSModule { }