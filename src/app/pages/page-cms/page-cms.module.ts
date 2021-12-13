import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CocoringButtonModule } from 'cocori-ng';
import { CocoringCMSModule, CocoringCmsReadonlyModule, SharedCMSModule } from 'cocori-ng/src/feature-cms';
import { CocoringVariableHtmlModule } from 'cocori-ng/src/feature-core';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { CenterZoneReadonlyTplComponent } from './blocks/center-zone/center-zone-readonly.component';
import { CenterZoneTplComponent } from './blocks/center-zone/center-zone.component';
import { ImageFullTextReadonlyComponent } from './blocks/image-full-text/image-full-text-readonly.component';
import { ImageFullTextComponent } from './blocks/image-full-text/image-full-text.component';
import { TextImageFullReadonlyComponent } from './blocks/text-image-full/text-image-full-readonly.component';
import { TextImageFullComponent } from './blocks/text-image-full/text-image-full.component';
import { TitleTwoZonesReadonlyComponent } from './blocks/title-two-zones/title-two-zones-readonly.component';
import { TitleTwoZonesComponent } from './blocks/title-two-zones/title-two-zones.component';
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
    TitleTwoZonesComponent,
    TextImageFullComponent,
    ImageFullTextComponent,
    CenterZoneReadonlyTplComponent,
    TwoZonesHReadonlyComponent,
    TitleTwoZonesReadonlyComponent,
    TextImageFullReadonlyComponent,
    ImageFullTextReadonlyComponent,
    PageCMSComponent,
    PageTestComponent,
  ],
})
export class PageCMSModule { }
