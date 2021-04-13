import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageCMSComponent } from './page-cms.component';

const routes: Routes = [
  { path: '', component: PageCMSComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageCMSRoutingModule { }
