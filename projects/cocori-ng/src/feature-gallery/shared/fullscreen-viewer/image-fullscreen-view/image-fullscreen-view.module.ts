import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SliderCustomImageComponent } from '../slider-custom-image/slider-custom-image.component';
import { ImageFullscreenViewComponent } from './image-fullscreen-view.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SliderCustomImageComponent,
        ImageFullscreenViewComponent
    ],
    exports: [
        ImageFullscreenViewComponent
    ]
})
export class ImageFullscreenViewModule { }
