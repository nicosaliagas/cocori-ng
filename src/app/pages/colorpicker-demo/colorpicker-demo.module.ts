import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CocoringColorpickerModule } from '@cocori-ng/lib/src/lib/feature-core';

import { ColorpickerDemoRoutingModule } from './colorpicker-demo-routing.module';
import { ColorpickerDemoComponent } from './colorpicker-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ColorpickerDemoRoutingModule,
    CocoringColorpickerModule
  ],
  declarations: [
    ColorpickerDemoComponent
  ],
})
export class ColorpickerDemoModule { }
