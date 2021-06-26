import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToastDemoComponent } from './toast-demo.component';

const routes: Routes = [
  { path: '', component: ToastDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToastDemoRoutingModule { }
