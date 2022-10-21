import { Directive } from '@angular/core';

import { DatagridService } from '../../../core';

@Directive({
    selector: '[cocoring-datagrid-group]',
    providers: [DatagridService]
})
export class CocoringDatagridGroupDirective { }