import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CocoringButtonModule } from 'cocori-ng';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    CocoringButtonModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
