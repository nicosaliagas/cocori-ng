import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { CocoringFileSizeModule } from '../../pipe/file-size/cocoring-file-size.module';
import { CocoringButtonModule } from '../button/cocoring-button.module';
import { CocoringUploaderListFileComponent } from './cocoring-uploader-list-file/cocoring-uploader-list-file.component';
import { CocoringUploaderComponent } from './cocoring-uploader.component';

@NgModule({
    declarations: [
        CocoringUploaderComponent,
        CocoringUploaderListFileComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
        CocoringFileSizeModule,
        ReactiveFormsModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        CocoringButtonModule,
    ],
    exports: [
        CocoringUploaderComponent
    ],
})
export class CocoringUploaderModule { }