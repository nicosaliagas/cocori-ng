import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { CocoringCheckboxModule } from '../form/inputs/input-checkbox/cocoring-checkbox.module';
import { CocoringDatagridCellComponent } from './cocoring-datagrid-cell/cocoring-datagrid-cell.component';
import { CocoringDatagridRowComponent } from './cocoring-datagrid-row/cocoring-datagrid-row.component';
import { CocoringDatagridToolbarComponent } from './cocoring-datagrid-toolbar/cocoring-datagrid-toolbar.component';
import { CocoringDatagridComponent } from './cocoring-datagrid.component';

@NgModule({
    declarations: [
        CocoringDatagridComponent,
        CocoringDatagridRowComponent,
        CocoringDatagridCellComponent,
        CocoringDatagridToolbarComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        CocoringCheckboxModule
    ],
    exports: [CocoringDatagridComponent]
})
export class CocoringDatagridModule { }