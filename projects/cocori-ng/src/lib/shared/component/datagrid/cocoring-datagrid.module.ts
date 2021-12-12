import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CocoringCheckboxModule } from '@cocori-ng/lib/src/lib/feature-core';

import { CocoringButtonModule } from '../../../feature-core/shared/component/button/cocoring-button.module';
import { CocoringDatagridGroupDirective } from '../../directive/datagrid/cocoring-datagrid-group.directive';
import { CocoringDatagridCellComponent } from './cocoring-datagrid-cell/cocoring-datagrid-cell.component';
import {
    CocoringDatagridFilterColumnComponent,
} from './cocoring-datagrid-filter-modal/cocoring-datagrid-filter-column/cocoring-datagrid-filter-column.component';
import {
    CocoringDatagridFilterModalComponent,
} from './cocoring-datagrid-filter-modal/cocoring-datagrid-filter-modal.component';
import { CocoringDatagridHeadComponent } from './cocoring-datagrid-head/cocoring-datagrid-head.component';
import { CocoringDatagridRowComponent } from './cocoring-datagrid-row/cocoring-datagrid-row.component';
import {
    CocoringDatagridSearchbarComponent,
} from './cocoring-datagrid-toolbar/cocoring-datagrid-searchbar/cocoring-datagrid-searchbar.component';
import { CocoringDatagridToolbarComponent } from './cocoring-datagrid-toolbar/cocoring-datagrid-toolbar.component';
import { CocoringDatagridComponent } from './cocoring-datagrid.component';

@NgModule({
    declarations: [
        CocoringDatagridComponent,
        CocoringDatagridRowComponent,
        CocoringDatagridCellComponent,
        CocoringDatagridHeadComponent,
        CocoringDatagridFilterModalComponent,
        CocoringDatagridFilterColumnComponent,
        CocoringDatagridToolbarComponent,
        CocoringDatagridSearchbarComponent,
        CocoringDatagridGroupDirective
    ],
    imports: [
        CommonModule,
        DragDropModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatInputModule,
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