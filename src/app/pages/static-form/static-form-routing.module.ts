import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaticFormComponent } from './static-form.component';

const routes: Routes = [
  { path: '', component: StaticFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticFormRoutingModule { }
