import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CocoringDatagridGroupDirective } from '../../directive/datagrid-group/cocoring-datagrid-group.directive';
import { CocoringButtonModule } from '../button/cocoring-button.module';
import { CocoringCheckboxModule } from '../form/inputs/input-checkbox/cocoring-checkbox.module';
import { CocoringDatagridCellComponent } from './cocoring-datagrid-cell/cocoring-datagrid-cell.component';
import {
    CocoringDatagridFilterColumnsComponent,
} from './cocoring-datagrid-filter-modal/cocoring-datagrid-filter-columns/cocoring-datagrid-filter-columns.component';
import {
    CocoringDatagridFilterModalComponent,
} from './cocoring-datagrid-filter-modal/cocoring-datagrid-filter-modal.component';
import { CocoringDatagridHeadComponent } from './cocoring-datagrid-head/cocoring-datagrid-head.component';
import { CocoringDatagridRowComponent } from './cocoring-datagrid-row/cocoring-datagrid-row.component';
import { CocoringDatagridToolbarComponent } from './cocoring-datagrid-toolbar/cocoring-datagrid-toolbar.component';
import { CocoringDatagridComponent } from './cocoring-datagrid.component';

@NgModule({
    declarations: [
        CocoringDatagridComponent,
        CocoringDatagridRowComponent,
        CocoringDatagridCellComponent,
        CocoringDatagridHeadComponent,
        CocoringDatagridFilterModalComponent,
        CocoringDatagridToolbarComponent,
        CocoringDatagridGroupDirective,
        CocoringDatagridFilterColumnsComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        CocoringButtonModule,
        CocoringCheckboxModule
    ],
    exports: [
        CocoringDatagridComponent,
        CocoringDatagridToolbarComponent,
        CocoringDatagridGroupDirective
    ],
})
export class CocoringDatagridModule { }