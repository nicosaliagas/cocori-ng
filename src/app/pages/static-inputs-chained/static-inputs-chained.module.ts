import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocoringPrettyPrintModule } from 'cocori-ng';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { StaticInputsChainedRoutingModule } from './static-inputs-chained-routing.module';
import { StaticInputsChainedComponent } from './static-inputs-chained.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaticInputsChainedRoutingModule,
    CocoringPrettyPrintModule,
    SharedProjectModule
  ],
  declarations: [StaticInputsChainedComponent]
})
export class StaticInputsChainedModule { }
