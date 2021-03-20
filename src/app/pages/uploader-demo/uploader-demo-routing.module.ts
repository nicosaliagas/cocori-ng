import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploaderDemoComponent } from './uploader-demo.component';

const routes: Routes = [
  { path: '', component: UploaderDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaderDemoRoutingModule { }
