import { Component, OnInit, ViewChild } from '@angular/core';
import { CocoringCmsComponent, SectionPageDatasModel } from '@cocori-ng/lib/src/lib/feature-cms';
import { ConfigCmsModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { EnvironmentService } from 'src/app/core/service/environment.service';

@Component({
  selector: 'page-cms',
  templateUrl: './page-cms.component.html',
  styleUrls: ['./page-cms.component.scss']
})
export class PageCMSComponent implements OnInit {
  @ViewChild(CocoringCmsComponent, { static: false }) cocoringDatagridComponent!: CocoringCmsComponent;

  configCms: ConfigCmsModel;

  constructor(
    private environmentService: EnvironmentService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.initConfigCms()
  }

  public onSaveBtn(datas: SectionPageDatasModel[]) {
    console.log("datas cms", datas)

    this.storageService.setLocalStorageItem('cms-page-save', datas)
  }

  private initConfigCms() {
    this.configCms = <ConfigCmsModel>{
      wysiwygOptions: {
        apiFile: (fileId) => {
          return `${this.environmentService.appServerPath}/api/upload/file/${fileId ? fileId : ''}`
        },
        apiFileDownload: (fileId) => {
          return `${this.environmentService.appServerPath}/api/upload/file/${fileId}?download=true`
        },
        apiKey: this.environmentService.tinymceApiKey
      }
    }
  }
}
