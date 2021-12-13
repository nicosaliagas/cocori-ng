import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { InputIconModule } from '../input-icon/input-icon.module';
import { CocoringEmailComponent } from './cocoring-email.component';

@NgModule({
    declarations: [
        CocoringEmailComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CocoringInputErrorModule,
        InputIconModule,
    ],
    exports: [
        CocoringEmailComponent,
    ]
})
export class CocoringEmailModule { }