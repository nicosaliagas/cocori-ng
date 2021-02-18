import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrilleDemoComponent } from './grille-demo.component';

const routes: Routes = [
  { path: '', component: GrilleDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrilleDemoRoutingModule { }
