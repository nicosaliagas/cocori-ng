import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CocoringFormContainerModule, CocoringPrettyPrintModule, CocoringTextareaModule } from 'cocori-ng';

import { GenericFormRoutingModule } from './generic-form-routing.module';
import { GenericFormComponent } from './generic-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    GenericFormRoutingModule,
    CocoringTextareaModule,
    CocoringPrettyPrintModule,
    CocoringFormContainerModule
  ],
  declarations: [GenericFormComponent]
})
export class GenericFormModule { }
