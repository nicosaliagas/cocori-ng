import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, MaterialSharedModule, SharedModule } from 'cocori-ng';

import { StaticInputsChainedRoutingModule } from './static-inputs-chained-routing.module';
import { StaticInputsChainedComponent } from './static-inputs-chained.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StaticInputsChainedRoutingModule,
    CoreModule,
    SharedModule,
    MaterialSharedModule
  ],
  declarations: [StaticInputsChainedComponent]
})
export class StaticInputsChainedModule { }
