import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CocoringWysiwygModule } from '@cocori-ng/lib';
import { SharedProjectModule } from 'src/app/shared/shared-project.module';

import { WysiwygDemoRoutingModule } from './wysiwyg-demo-routing.module';
import { WysiwygDemoComponent } from './wysiwyg-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WysiwygDemoRoutingModule,
    SharedProjectModule,
    CocoringWysiwygModule
  ],
  declarations: [
    WysiwygDemoComponent
  ],
})
export class WysiwygDemoModule { }
