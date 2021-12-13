import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CocoringDatagridModule } from 'cocori-ng';
import { CocoringAutoUnsubscribeModule } from 'cocori-ng/src/feature-core';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { GrilleDemoRoutingModule } from './grille-demo-routing.module';
import { GrilleDemoComponent } from './grille-demo.component';

@NgModule({
  imports: [
    CommonModule,
    GrilleDemoRoutingModule,
    CocoringDatagridModule,
    CocoringAutoUnsubscribeModule,
    SharedProjectModule,
  ],
  declarations: [
    GrilleDemoComponent
  ],
})
export class GrilleDemoModule { }
