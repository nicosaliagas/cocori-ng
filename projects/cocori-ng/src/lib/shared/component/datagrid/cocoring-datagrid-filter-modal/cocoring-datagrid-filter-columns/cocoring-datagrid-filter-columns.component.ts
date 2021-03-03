import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-filter-columns',
  templateUrl: './cocoring-datagrid-filter-columns.component.html',
  styleUrls: ['./cocoring-datagrid-filter-columns.component.scss']
})
export class CocoringDatagridFilterColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
