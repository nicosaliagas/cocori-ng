import { Component, OnInit } from '@angular/core';
import { ConfigDatagridModel, DatagridService, DatasourceOdata, DataSourceType } from '@cocori-ng/lib';
import { DatagridDemoService } from 'src/app/core/service/datagrid-demo.service';

@Component({
  selector: 'grille-demo',
  templateUrl: './grille-demo.component.html',
  styleUrls: ['./grille-demo.component.scss']
})
export class GrilleDemoComponent implements OnInit {
  _config: ConfigDatagridModel;

  constructor(
    private datagridDemoService: DatagridDemoService,
    private datagridService: DatagridService) {
    this.datagridService.allRowsChecked$.subscribe((value: boolean) => {
      console.log("from app, check all rows", value)
    })
  }

  ngOnInit() {
    this.initConfigDatagrid()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private initConfigDatagrid() {

    this.datagridDemoService.mockDatagridDatas().subscribe((values: DatasourceOdata) => {
      this._config = {
        columns: [
          { caption: "Nom", dataField: "name", dataType: "string", visible: true },
          { caption: "Prénom", dataField: "surname", dataType: "string", visible: true },
          { caption: "Civilité", dataField: "civility", dataType: "string", visible: true },
          { caption: "Age", dataField: "age", dataType: "number", visible: true },
          { caption: "Col Bool", dataField: "testBool", dataType: "boolean", visible: true },
          { caption: "Col Num", dataField: "testNum", dataType: "number", visible: true },
          { caption: "Col Dat", dataField: "testDate", dataType: "date", visible: true },
          { caption: "Col 1", dataField: "test1", dataType: "string", visible: true },
          { caption: "Col 2", dataField: "test2", dataType: "number", visible: true },
          { caption: "Col 3", dataField: "test3", dataType: "string", visible: true },
        ],
        dataSource: { type: DataSourceType.BRUTE, value: values },
        withBatchProcessing: true
      }
    })
  }
}
