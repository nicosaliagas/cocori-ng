import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigUploaderModel, FileModel } from '../../../core/model/component-uploader.model';
import { DataSourceInput } from '../../../core/model/data-source.model';
import { DatasourceService } from '../../../core/service/datasource.service';
import { UploaderService } from '../../../core/service/uploader/uploader.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader',
  templateUrl: './cocoring-uploader.component.html',
  styleUrls: ['./cocoring-uploader.component.scss']
})
export class CocoringUploaderComponent implements OnInit, OnDestroy {

  filesDataSource$!: Observable<FileModel[]>;

  uploaderConfig: ConfigUploaderModel;

  @Input()
  set config(config: ConfigUploaderModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.uploaderConfig = config;

    this.loadDataSource(this.uploaderConfig.dataSource);
  }

  constructor(
    public uploaderService: UploaderService,
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
