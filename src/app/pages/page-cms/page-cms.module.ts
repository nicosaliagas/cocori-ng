import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CocoringButtonModule } from '@cocori-ng/lib';
import { CocoringCMSModule, CocoringCmsReadonlyModule, SharedCMSModule } from '@cocori-ng/lib/src/lib/feature-cms';
import { CocoringVariableHtmlModule } from '@cocori-ng/lib/src/lib/feature-core';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { CenterZoneReadonlyTplComponent } from './blocks/center-zone/center-zone-readonly.component';
import { CenterZoneTplComponent } from './blocks/center-zone/center-zone.component';
import { TwoZonesHReadonlyComponent } from './blocks/two-zones-h/two-zones-h-readonly.component';
import { TwoZonesHComponent } from './blocks/two-zones-h/two-zones-h.component';
import { PageCMSRoutingModule } from './page-cms-routing.module';
import { PageCMSComponent } from './page-cms.component';
import { PageTestComponent } from './page-test/page-test.component';

@NgModule({
  imports: [
    CommonModule,
    PageCMSRoutingModule,
    SharedProjectModule,
    CocoringCMSModule,
    SharedCMSModule,
    CocoringButtonModule,
    MatIconModule,
    CocoringCmsReadonlyModule,
    CocoringVariableHtmlModule,
    FlexLayoutModule
  ],
  declarations: [
    CenterZoneTplComponent,
    TwoZonesHComponent,
    CenterZoneReadonlyTplComponent,
    TwoZonesHReadonlyComponent,
    PageCMSComponent,
    PageTestComponent,
  ],
})
export class PageCMSModule { }
