import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SectionTplComponent } from './section-tpl/section-tpl.component';

@NgModule({
  declarations: [
    SectionTplComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [SectionTplComponent]
})
export class SharedCMSModule { }
