import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageFullscreenViewModule } from 'cocori-ng/src/feature-gallery';

import { PageFullscreenViewerRoutingModule } from './page-fullscreen-viewer-routing.module';
import { PageFullscreenViewerComponent } from './page-fullscreen-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    PageFullscreenViewerRoutingModule,
    ImageFullscreenViewModule
  ],
  declarations: [
    PageFullscreenViewerComponent,
  ],
})
export class PageFullscreenViewerModule { }
