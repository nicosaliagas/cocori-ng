import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeFr from '@angular/common/locales/fr';
import { ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatagridService, GlobalErrorInterceptorService, LoadingInterceptorService } from 'cocori-ng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/component/toolbar/toolbar.component';
import { SharedProjectModule } from './shared/shared-project.module';

// https://angular.io/guide/i18n#i18n-pipes
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule,
    SharedProjectModule,
  ],
  providers: [
    DatagridService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorInterceptorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
