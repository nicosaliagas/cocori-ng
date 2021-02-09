import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibDemoComponent } from './lib-demo.component';

const routes: Routes = [
  { path: '', component: LibDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibDemoRoutingModule { }
