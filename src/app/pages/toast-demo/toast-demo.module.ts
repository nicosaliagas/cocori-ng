import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CocoringColorpickerModule } from 'cocori-ng/src/feature-core';

import { ToastDemoRoutingModule } from './toast-demo-routing.module';
import { ToastDemoComponent } from './toast-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ToastDemoRoutingModule,
    MatButtonModule,
    CocoringColorpickerModule
  ],
  declarations: [
    ToastDemoComponent
  ],
})
export class ToastDemoModule { }
