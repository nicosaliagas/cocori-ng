import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, SharedModule } from 'cocori-ng';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
