import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, MaterialSharedModule, SharedModule } from 'cocori-ng';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { StaticFormRoutingModule } from './static-form-routing.module';
import { StaticFormComponent } from './static-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaticFormRoutingModule,
    CoreModule,
    SharedModule,
    SharedProjectModule,
    MaterialSharedModule
  ],
  declarations: [StaticFormComponent]
})
export class StaticFormModule { }
