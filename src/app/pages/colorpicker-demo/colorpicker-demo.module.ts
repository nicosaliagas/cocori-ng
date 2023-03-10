import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CocoringColorpickerModule } from 'cocori-ng/src/feature-form';

import { ColorpickerDemoRoutingModule } from './colorpicker-demo-routing.module';
import { ColorpickerDemoComponent } from './colorpicker-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ColorpickerDemoRoutingModule,
    MatButtonModule,
    CocoringColorpickerModule
  ],
  declarations: [
    ColorpickerDemoComponent
  ],
})
export class ColorpickerDemoModule { }
