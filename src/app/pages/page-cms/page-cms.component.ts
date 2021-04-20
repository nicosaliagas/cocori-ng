import { Component, OnInit } from '@angular/core';
import { ConfigCmsModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';
import { EnvironmentService } from 'src/app/core/service/environment.service';

@Component({
  selector: 'page-cms',
  templateUrl: './page-cms.component.html',
  styleUrls: ['./page-cms.component.scss']
})
export class PageCMSComponent implements OnInit {

  configCms: ConfigCmsModel;

  constructor(private environmentService: EnvironmentService,) { }

  ngOnInit() {
    this.initConfigCms()
  }

  private initConfigCms() {
    this.configCms = <ConfigCmsModel>{
      wysiwygOptions: {
        apiFile: (fileId) => {
          return `${this.environmentService.appServerPath}/api/file/${fileId ? fileId : ''}`
        },
        apiFileDownload: (fileId) => {
          return `${this.environmentService.appServerPath}/api/file/${fileId}?download=true`
        },
        apiKey: this.environmentService.tinymceApiKey
      }
    }
  }
}
