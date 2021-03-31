import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigAPIsFile, ConfigUploaderModel, FileModel } from '../../../core/model/component-uploader.model';
import { DataSourceInput } from '../../../core/model/data-source.model';
import { DatasourceService } from '../../../core/service/datasource.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader',
  templateUrl: './cocoring-uploader.component.html',
  styleUrls: ['./cocoring-uploader.component.scss'],
})
export class CocoringUploaderComponent implements OnInit, OnDestroy {

  filesDataSource$!: Observable<FileModel[]>;

  apisFile: ConfigAPIsFile;
  label: string;

  @Input()
  set config(config: ConfigUploaderModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.label = config.label

    this.apisFile = {apiFile: config.apiFile, apiFileDownload: config.apiFileDownload}

    this.loadDataSource(config.dataSource);
  }

  constructor(
    private datasourceService: DatasourceService) { }

  ngOnInit() { }

  ngOnDestroy() { }

  private loadDataSource(configDataSource: DataSourceInput): Observable<any> {
    if (!configDataSource) return;

    this.filesDataSource$ = this.datasourceService.loadDataSource(configDataSource)

    // this.datasourceService.loadDataSource(configDataSource).pipe(
    //   tap((datas: any) => console.log("datas", datas))
    // ).subscribe()
  }
}
