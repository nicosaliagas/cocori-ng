import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageFullscreenViewerComponent } from './page-fullscreen-viewer.component';

const routes: Routes = [
  { path: '', component: PageFullscreenViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageFullscreenViewerRoutingModule { }
