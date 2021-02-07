import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    MatMenuModule,
    MatListModule,
    MatFormFieldModule, /** A SUPPRIMER */
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatInputModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatInputModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDividerModule
  ],
})
export class MaterialSharedModule { }
