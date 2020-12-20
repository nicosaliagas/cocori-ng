import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenericFormComponent } from './generic-form.component';

const routes: Routes = [
  { path: '', component: GenericFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericFormRoutingModule { }
