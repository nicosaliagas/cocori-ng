import { Directive } from '@angular/core';

import { DatagridService } from '../../../core/service/datagrid/datagrid.service';

@Directive({
    selector: '[cocoring-datagrid-group]',
    providers: [DatagridService]
})
export class CocoringDatagridGroupDirective { }