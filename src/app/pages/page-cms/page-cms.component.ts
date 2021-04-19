import { Component, OnInit } from '@angular/core';
import { ConfigCmsModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';

@Component({
  selector: 'page-cms',
  templateUrl: './page-cms.component.html',
  styleUrls: ['./page-cms.component.scss']
})
export class PageCMSComponent implements OnInit {

  configCms: ConfigCmsModel;

  constructor() { }

  ngOnInit() {
    this.initConfigCms()
  }

  private initConfigCms() {
    this.configCms = <ConfigCmsModel>{
      wysiwygOptions: {
        apiFile: (fileId) => {
          return `http://localhost:8080/api/file/${fileId ? fileId : ''}`
        },
        apiFileDownload: (fileId) => {
          return `http://localhost:8080/api/file/${fileId}?download=true`
        },
        apiKey: 'fgijz3yzk7apwi527umteuey9tcto85mzsiz0m9k77avn70f'
      }
    }
  }
}
