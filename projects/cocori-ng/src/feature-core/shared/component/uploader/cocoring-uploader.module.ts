import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CocoringFileSizeModule } from '../../pipe/file-size/cocoring-file-size.module';
import { CocoringButtonModule } from '../button/cocoring-button.module';
import { CocoringInputErrorModule } from '../error-handler/input-error-handler/cocoring-input-error.module';
import {
  CocoringUploaderBottomSheetComponent,
} from './cocoring-uploader-bottom-sheet/cocoring-uploader-bottom-sheet.component';
import {
  CocoringUploaderFileActionsComponent,
} from './cocoring-uploader-file-actions/cocoring-uploader-file-actions.component';
import { CocoringUploaderListFileComponent } from './cocoring-uploader-list-file/cocoring-uploader-list-file.component';
import { CocoringUploaderComponent } from './cocoring-uploader.component';

@NgModule({
  declarations: [
    CocoringUploaderComponent,
    CocoringUploaderListFileComponent,
    CocoringUploaderFileActionsComponent,
    CocoringUploaderBottomSheetComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CocoringFileSizeModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CocoringInputErrorModule,
    CocoringButtonModule,
  ],
  exports: [
    CocoringUploaderComponent
  ],
})
export class CocoringUploaderModule { }