import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaticInputsChainedComponent } from './static-inputs-chained.component';

const routes: Routes = [
  { path: '', component: StaticInputsChainedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticInputsChainedRoutingModule { }
