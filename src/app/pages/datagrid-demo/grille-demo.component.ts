import { Component, OnInit } from '@angular/core';
import { ConfigDatagridModel, DatagridService, DatasourceOdata, DataSourceType } from 'cocori-ng';
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
      this.datagridService.allRowsChecked.subscribe((value: boolean) => {
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
        title: "Grille utilisateurs",
        columns: [
          { caption: "Nom", dataField: "name" },
          { caption: "Prénom", dataField: "surname" },
          { caption: "Civilité", dataField: "civility" },
          { caption: "Age", dataField: "age" },
        ],
        dataSource: { type: DataSourceType.BRUTE, value: values }
      }
    })
  }
}
