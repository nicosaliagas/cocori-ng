import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DateDemoComponent } from './date-demo.component';

const routes: Routes = [
  { path: '', component: DateDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateDemoRoutingModule { }
