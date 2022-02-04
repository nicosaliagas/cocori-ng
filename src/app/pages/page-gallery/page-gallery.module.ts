import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GalleryModule } from 'ng-gallery';

import { PageGalleryRoutingModule } from './page-gallery-routing.module';
import { PageGalleryComponent } from './page-gallery.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    PageGalleryRoutingModule,
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
  ],
  declarations: [
    PageGalleryComponent,
  ],
})
export class PageGalleryModule { }
