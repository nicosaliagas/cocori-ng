import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CocoringButtonModule } from '@cocori-ng/lib';
import { CocoringCMSModule, CocoringCmsReadonlyModule } from '@cocori-ng/lib/src/lib/feature-cms';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { PageCMSRoutingModule } from './page-cms-routing.module';
import { PageCMSComponent } from './page-cms.component';
import { PageTestComponent } from './page-test/page-test.component';

@NgModule({
  imports: [
    CommonModule,
    PageCMSRoutingModule,
    SharedProjectModule,
    CocoringCMSModule,
    CocoringButtonModule,
    MatIconModule,
    CocoringCmsReadonlyModule,
  ],
  declarations: [
    PageCMSComponent,
    PageTestComponent,
  ],
})
export class PageCMSModule { }
