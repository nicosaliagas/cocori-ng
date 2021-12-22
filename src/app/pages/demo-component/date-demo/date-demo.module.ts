import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';

import { DateDemoRoutingModule } from './date-demo-routing.module';
import { DateDemoComponent } from './date-demo.component';

@NgModule({
  imports: [
    CommonModule,
    DateDemoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    DateDemoComponent
  ],
})
export class DateDemoModule { }
