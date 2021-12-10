import { Directive } from '@angular/core';
import { DatagridService } from '@cocori-ng/lib/src/lib/feature-core';

@Directive({
    selector: '[cocoring-datagrid-group]',
    providers: [DatagridService]
})
export class CocoringDatagridGroupDirective { }