import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, MaterialSharedModule, SharedModule } from 'cocori-ng';

import { GenericFormRoutingModule } from './generic-form-routing.module';
import { GenericFormComponent } from './generic-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GenericFormRoutingModule,
    CoreModule,
    SharedModule,
    MaterialSharedModule
  ],
  declarations: [GenericFormComponent]
})
export class GenericFormModule { }
