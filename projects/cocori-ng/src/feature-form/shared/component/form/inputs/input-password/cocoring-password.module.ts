import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { InputIconModule } from '../input-icon/input-icon.module';
import { CocoringPasswordComponent } from './cocoring-password.component';

@NgModule({
    declarations: [
        CocoringPasswordComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        CocoringInputErrorModule,
    ],
    exports: [
        CocoringPasswordComponent
    ]
})
export class CocoringPasswordModule { }