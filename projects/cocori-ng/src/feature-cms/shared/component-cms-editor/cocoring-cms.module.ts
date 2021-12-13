import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { CocoringColorpickerModule, CocoringVariableHtmlModule, CocoringWysiwygModule } from 'cocori-ng/src/feature-core';

import { SharedCMSModule } from '../shared-cms.module';
import { CocoringCmsBlocksCatalogComponent } from './cocoring-cms-blocks-catalog/cocoring-cms-blocks-catalog.component';
import { CocoringCmsImageUploadComponent } from './cocoring-cms-image-upload/cocoring-cms-image-upload.component';
import { CocoringCmsSectionActionsComponent } from './cocoring-cms-section-actions/cocoring-cms-section-actions.component';
import { CocoringCmsSectionComponent } from './cocoring-cms-section/cocoring-cms-section.component';
import { CocoringCmsComponent } from './cocoring-cms/cocoring-cms.component';
import { CocoringPreviewOptionsComponent } from './cocoring-preview-options/cocoring-preview-options.component';
import { CocoringToolbarCmsComponent } from './cocoring-toolbar-cms/cocoring-toolbar-cms.component';

@NgModule({
    declarations: [
        CocoringCmsComponent,
        CocoringCmsBlocksCatalogComponent,
        CocoringCmsSectionComponent,
        CocoringCmsSectionActionsComponent,
        CocoringToolbarCmsComponent,
        CocoringPreviewOptionsComponent,
        CocoringCmsImageUploadComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedCMSModule,
        DragDropModule,
        MatSidenavModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        CocoringVariableHtmlModule,
        CocoringWysiwygModule,
        CocoringColorpickerModule
    ],
    exports: [
        CocoringCmsComponent,
        CocoringPreviewOptionsComponent
    ]
})
export class CocoringCMSModule { }