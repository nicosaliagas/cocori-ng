import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { EyeOptionPasswordComponent } from './cocoring-password-eye.component';
import { CocoringPasswordComponent } from './cocoring-password.component';

@NgModule({
    declarations: [
        CocoringPasswordComponent,
        EyeOptionPasswordComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CocoringInputErrorModule,
        ],
    exports: [
        CocoringPasswordComponent,
        EyeOptionPasswordComponent
    ]
})
export class CocoringPasswordModule { }