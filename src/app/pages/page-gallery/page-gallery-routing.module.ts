import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageGalleryComponent } from './page-gallery.component';

const routes: Routes = [
  { path: '', component: PageGalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageGalleryRoutingModule { }
