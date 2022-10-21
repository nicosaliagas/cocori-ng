import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocoringPreviousPageModule } from 'cocori-ng/src/feature-form';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CocoringPreviousPageModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
