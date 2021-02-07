import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CocoringPrettyPrintModule } from 'cocori-ng';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { StaticFormRoutingModule } from './static-form-routing.module';
import { StaticFormComponent } from './static-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    StaticFormRoutingModule,
    CocoringPrettyPrintModule,
    SharedProjectModule,
  ],
  declarations: [StaticFormComponent]
})
export class StaticFormModule { }
