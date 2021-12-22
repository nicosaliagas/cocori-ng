import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule } from 'ngx-mask';

import { CocoringInputErrorModule } from '../../../error-handler/input-error-handler/cocoring-input-error.module';
import { InputIconModule } from '../input-icon/input-icon.module';
import { CocoringDateComponent } from './cocoring-date.component';

@NgModule({
    declarations: [
        CocoringDateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        CocoringInputErrorModule,
        InputIconModule,
        TextMaskModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        CocoringDateComponent,
    ]
})
export class CocoringDateModule { }