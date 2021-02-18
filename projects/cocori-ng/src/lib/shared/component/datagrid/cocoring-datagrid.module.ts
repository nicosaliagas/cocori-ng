import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CocoringCheckboxModule } from '../form/inputs/input-checkbox/cocoring-checkbox.module';
import { CocoringDatagridCellComponent } from './cocoring-datagrid-cell/cocoring-datagrid-cell.component';
import { CocoringDatagridRowComponent } from './cocoring-datagrid-row/cocoring-datagrid-row.component';
import { CocoringDatagridComponent } from './cocoring-datagrid.component';

@NgModule({
    declarations: [
        CocoringDatagridComponent,
        CocoringDatagridRowComponent,
        CocoringDatagridCellComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CocoringCheckboxModule
    ],
    exports: [CocoringDatagridComponent]
})
export class CocoringDatagridModule { }