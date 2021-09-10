import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocoringButtonModule, CocoringConfirmModalModule } from '@cocori-ng/lib';
import { CocoringAutoUnsubscribeModule } from '@cocori-ng/lib/src/lib/feature-core';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { ModalPageRoutingModule } from './modal-page-routing.module';
import { ModalPageComponent } from './modal-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalPageRoutingModule,
    CocoringConfirmModalModule,
    SharedProjectModule,
    CocoringAutoUnsubscribeModule,
    CocoringButtonModule
  ],
  declarations: [ModalPageComponent]
})
export class ModalPageModule { }
