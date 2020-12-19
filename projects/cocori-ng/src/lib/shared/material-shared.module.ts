import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule
  ],
  exports: [
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
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
  ],
})
export class MaterialSharedModule { }
