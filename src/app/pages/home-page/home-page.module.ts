import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CocoringButtonModule } from 'cocori-ng/src/feature-form';
import { SharedComponentsPageModule } from 'src/app/shared/shared-components-page.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    CocoringButtonModule,
    SharedComponentsPageModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
