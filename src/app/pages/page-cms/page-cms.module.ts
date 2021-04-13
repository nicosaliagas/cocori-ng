import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CocoringCMSModule } from '@cocori-ng/lib/src/lib/feature-cms';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { PageCMSRoutingModule } from './page-cms-routing.module';
import { PageCMSComponent } from './page-cms.component';

@NgModule({
  imports: [
    CommonModule,
    PageCMSRoutingModule,
    SharedProjectModule,
    CocoringCMSModule,
  ],
  declarations: [
    PageCMSComponent
  ],
})
export class PageCMSModule { }
