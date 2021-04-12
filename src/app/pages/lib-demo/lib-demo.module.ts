import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CocoringButtonModule } from '@cocori-ng/lib';

import { LibDemoRoutingModule } from './lib-demo-routing.module';
import { LibDemoComponent } from './lib-demo.component';

@NgModule({
  imports: [
    CommonModule,
    LibDemoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    CocoringButtonModule
  ],
  declarations: [LibDemoComponent]
})
export class LibDemoModule { }
