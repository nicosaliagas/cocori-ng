import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CocoringInputErrorModule } from '../error-handler/input-error-handler/cocoring-input-error.module';
import { CocoringWysiwygComponent } from './cocoring-wysiwyg.component';

@NgModule({
  declarations: [
    CocoringWysiwygComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CocoringInputErrorModule,
    EditorModule,
  ],
  exports: [
    CocoringWysiwygComponent
  ],
})
export class CocoringWysiwygModule { }