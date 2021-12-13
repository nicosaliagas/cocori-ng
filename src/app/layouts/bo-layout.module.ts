import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CocoringPreviousPageModule } from 'cocori-ng';

import { ToolbarComponent } from '../shared/component/toolbar/toolbar.component';
import { SharedProjectModule } from '../shared/shared-project.module';
import { CmsLayoutRoutingModule } from './bo-layout-routing.module';
import { BoLayoutComponent } from './bo-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    SharedProjectModule,
    CocoringPreviousPageModule,
    CmsLayoutRoutingModule,
  ],
  declarations: [
    ToolbarComponent,
    BoLayoutComponent,
  ]
})
export class BoLayoutModule { }
