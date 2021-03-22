import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  files: FileModel[] = [
    {
      id: 'E1C57AD5-6921-44CE-8F0E-7230CE576205',
      fileName: 'Rapport.pdf',
      size: 182.23,
      fileType: 'doc'
    },
    {
      id: '3CE8B88D-E32F-4BAF-AABB-E70866687340',
      fileName: 'CarteIdentite.png',
      size: 82.12,
      fileType: 'image'
    },
    {
      fileName: 'Votre passeport',
    },
  ];

  uploaderConfig: ConfigUploaderModel;

  @Input()
  set config(config: ConfigUploaderModel) {
    if (!config) {
      throw new Error(`La config du datgrid n'est pas correcte... config: ${config}`);
    }

    this.uploaderConfig = config;

    this.loadDataSource(this.uploaderConfig.dataSource);
  }

  constructor(
    public uploaderService: UploaderService,
    private datasourceService: DatasourceService) { }

  ngOnInit(): void { }

  ngOnDestroy() { }

  private loadDataSource(configDataSource: DataSourceInput): Observable<any> {
    if (!configDataSource) return;

    this.datasourceService.loadDataSource(configDataSource).pipe(
      tap((datas: any) => console.log("datas", datas))
    ).subscribe()
  }
}
