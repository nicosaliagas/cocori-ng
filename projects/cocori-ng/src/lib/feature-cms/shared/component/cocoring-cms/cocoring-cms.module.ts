import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CocoringCmsComponent } from './cocoring-cms.component';

@NgModule({
    declarations: [
        CocoringCmsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatIconModule,
        FlexLayoutModule
    ],
    exports: [
        CocoringCmsComponent,
    ],
})
export class CocoringCMSModule { }