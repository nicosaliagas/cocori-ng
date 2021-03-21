import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { CocoringButtonModule } from '../button/cocoring-button.module';
import { CocoringUploaderComponent } from './cocoring-uploader.component';

@NgModule({
    declarations: [
        CocoringUploaderComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
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