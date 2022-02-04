import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeFr from '@angular/common/locales/fr';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS, MAT_LUXON_DATE_FORMATS } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { ToastErrorStacktraceModule } from 'cocori-ng/src/feature-core';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadEnvironmentFactory } from './core/class/app-factory';
import { EnvironmentLoaderService } from './core/service/environment-loader.service';
import { SharedProjectModule } from './shared/shared-project.module';

const DEFAULT_LOCALE = 'fr-FR'

// https://angular.io/guide/i18n#i18n-pipes
registerLocaleData(localeFr, DEFAULT_LOCALE, localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    MatDatepickerModule,
    MatNativeDateModule,
    ToastErrorStacktraceModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    DatagridService,
    {
      provide: MAT_DATE_LOCALE, useValue: DEFAULT_LOCALE
    },
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS
    },
    {
      provide: APP_INITIALIZER,
      useFactory: LoadEnvironmentFactory,
      multi: true,
      deps: [EnvironmentLoaderService],
    },
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
