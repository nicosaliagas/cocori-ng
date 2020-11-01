import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenericPageComponent } from './generic-page.component';

const routes: Routes = [
  { path: '', component: GenericPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericPageRoutingModule { }
