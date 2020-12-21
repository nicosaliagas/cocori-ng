import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, MaterialSharedModule, SharedModule } from 'cocori-ng';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { ModalPageRoutingModule } from './modal-page-routing.module';
import { ModalPageComponent } from './modal-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalPageRoutingModule,
    CoreModule,
    SharedModule,
    SharedProjectModule,
    MaterialSharedModule
  ],
  declarations: [ModalPageComponent]
})
export class ModalPageModule { }
