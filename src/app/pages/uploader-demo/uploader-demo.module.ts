import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CocoringUploaderModule } from 'cocori-ng';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { UploaderDemoRoutingModule } from './uploader-demo-routing.module';
import { UploaderDemoComponent } from './uploader-demo.component';

@NgModule({
  imports: [
    CommonModule,
    UploaderDemoRoutingModule,
    CocoringUploaderModule,
    SharedProjectModule,
  ],
  declarations: [
    UploaderDemoComponent
  ],
})
export class UploaderDemoModule { }
