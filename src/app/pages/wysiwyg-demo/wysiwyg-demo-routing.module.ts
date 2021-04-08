import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WysiwygDemoComponent } from './wysiwyg-demo.component';

const routes: Routes = [
  { path: '', component: WysiwygDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WysiwygDemoRoutingModule { }
