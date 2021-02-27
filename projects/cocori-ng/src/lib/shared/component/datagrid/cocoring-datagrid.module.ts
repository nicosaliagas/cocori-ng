import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { CocoringDatagridGroupDirective } from '../../directive/datagrid-group/cocoring-datagrid-group.directive';
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
        CocoringDatagridGroupDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        CocoringCheckboxModule
    ],
    exports: [
        CocoringDatagridComponent,
        CocoringDatagridToolbarComponent,
        CocoringDatagridGroupDirective
    ],
})
export class CocoringDatagridModule { }