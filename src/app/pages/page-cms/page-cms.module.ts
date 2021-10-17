import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CocoringButtonModule } from '@cocori-ng/lib';
import { CocoringCMSModule, CocoringCmsReadonlyModule, SharedCMSModule } from '@cocori-ng/lib/src/lib/feature-cms';
import { CocoringVariableHtmlModule } from '@cocori-ng/lib/src/lib/feature-core';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { SimpleBlockReadonlyTplComponent } from './blocks/simple-block/simple-block-readonly.component';
import { SimpleBlockComponent } from './blocks/simple-block/simple-block.component';
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
    CocoringVariableHtmlModule
  ],
  declarations: [
    SimpleBlockComponent,
    SimpleBlockReadonlyTplComponent,
    PageCMSComponent,
    PageTestComponent,
  ],
})
export class PageCMSModule { }
