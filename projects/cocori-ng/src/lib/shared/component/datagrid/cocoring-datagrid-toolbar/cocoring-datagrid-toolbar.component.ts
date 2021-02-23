import { Component, OnInit } from '@angular/core';

import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
  selector: 'cocoring-datagrid-toolbar',
  templateUrl: './cocoring-datagrid-toolbar.component.html',
  styleUrls: ['./cocoring-datagrid-toolbar.component.scss']
})
export class CocoringDatagridToolbarComponent implements OnInit {

  constructor(private datagridService: DatagridService) { }

  ngOnInit(): void {
  }

  refreshList() {
    this.datagridService.refreshNeeded$.next();
  }
}
