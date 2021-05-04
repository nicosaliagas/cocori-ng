import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageCMSComponent } from './page-cms.component';
import { PageTestComponent } from './page-test/page-test.component';

const routes: Routes = [
  { path: '', component: PageCMSComponent },
  { path: 'page-test', component: PageTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageCMSRoutingModule { }
