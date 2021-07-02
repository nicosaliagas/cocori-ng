import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CocoringCmsComponent, SectionPageDatasModel } from '@cocori-ng/lib/src/lib/feature-cms';
import { ConfigCmsModel, SectionModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { EnvironmentService } from 'src/app/core/service/environment.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-cms',
  templateUrl: './page-cms.component.html',
  styleUrls: ['./page-cms.component.scss']
})
export class PageCMSComponent implements OnInit {
  @ViewChild(CocoringCmsComponent, { static: false }) cocoringDatagridComponent!: CocoringCmsComponent;

  configCms: ConfigCmsModel;
  datasCms: SectionPageDatasModel[] = [];

  constructor(
    private environmentService: EnvironmentService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.initConfigCms()

    /** fonction de transfert */

    const datasToTransform: SectionPageDatasModel[] = [
      {
        "id":"034d03f4-1016-0d03-bf9e-0f5eb6217d7b",
        "backgroundColor": "#343a40",
        "template": "CenterZoneTpl",
        "values": {
          "editor1": "<h1 style=\"text-align: center;\"><span style=\"color: #ffffff;\">Made with ❤️ by Cocorisoft</span></h1>"
        }
      }]

    const transformInto: SectionModel = {
      "idSection": "034d03f4-1016-0d03-bf9e-0f5eb6217d7b",
      "block": {
        "component": "CenterZoneTpl",
        "data": {
          "idBlock": "987CE6B5-F5F3-40BC-8760-59D52811DBD9",
          "filename": "1.jpg",
          "label": "bloc avec une zone de texte",
          "backgroundColor": "#343a40",
          "content": {
            "editor1": "<h1 style=\"text-align: center;\"><span style=\"color: #ffffff;\">Made with ❤️ by Cocorisoft</span></h1>"
          }
        }
      },
      "backgroundColor": "#343a40", "values": null
    }

    this.datasCms = datasToTransform
  }

  public onSaveBtn(datas: SectionPageDatasModel[]) {
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
