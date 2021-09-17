import { Component, OnInit } from '@angular/core';
import { ConfigDatagridModel, DatagridService, DataSourceType } from '@cocori-ng/lib';
import { AutoUnsubscribeComponent, OdataModel } from '@cocori-ng/lib/src/lib/feature-core';
import { DatagridDemoService } from 'src/app/core/service/datagrid-demo.service';

@Component({
  selector: 'grille-demo',
  templateUrl: './grille-demo.component.html',
  styleUrls: ['./grille-demo.component.scss']
})
export class GrilleDemoComponent extends AutoUnsubscribeComponent implements OnInit {
  _config: ConfigDatagridModel;

  constructor(
    private datagridDemoService: DatagridDemoService,
    private datagridService: DatagridService) {
    super()

    this.subscriptions.add(
      this.datagridService.allRowsChecked$.subscribe((value: boolean) => {
        console.log("from app, check all rows", value)
      })
    )
  }

  ngOnInit() {
    this.initConfigDatagrid()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private initConfigDatagrid() {
    this.subscriptions.add(
      this.datagridDemoService.mockDatagridDatas().subscribe((values: OdataModel) => {
        this._config = {
          columns: [
            { caption: "Nom", dataField: "name", dataType: "string", visible: true },
            { caption: "Prénom", dataField: "surname", dataType: "string", visible: true },
            { caption: "Civilité", dataField: "civility", dataType: "string", visible: true },
            { caption: "EcoleBoulle", dataField: "Boulle", dataType: "boolean", visible: true },
            { caption: "Age", dataField: "age", dataType: "number", visible: true },
            { caption: "Col Bool", dataField: "testBool", dataType: "boolean", visible: true },
            { caption: "Col Num", dataField: "testNum", dataType: "number", visible: true },
            { caption: "Col Dat", dataField: "testDate", dataType: "date", visible: true },
            { caption: "Col 1", dataField: "test1", dataType: "string", visible: true },
            { caption: "Col 2", dataField: "test2", dataType: "number", visible: true },
            { caption: "Col 3", dataField: "test3", dataType: "string", visible: true },
          ],
          dataSource: { type: DataSourceType.BRUTE, value: values },
          withBatchProcessing: true,
          propIsArchived: 'testBool'
        }
      })
    )
  }

  eventClickRow($event) {
    console.log("get datas row >>> ", $event)
  }

  eventRowsDeleted(idsRowsSelected: string[]) {
    console.log("Ids rows to delete >>> ", idsRowsSelected)
  }

  eventRowsRestored(idsRowsSelected: string[]) {
    console.log("Ids rows to restore >>> ", idsRowsSelected)
  }
}
