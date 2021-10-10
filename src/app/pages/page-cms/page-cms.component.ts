import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CocoringCmsComponent, SectionModel } from '@cocori-ng/lib/src/lib/feature-cms';
import { ConfigCmsModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';
import { Block } from '@cocori-ng/lib/src/lib/feature-cms/core/service/block';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { CmsService } from 'src/app/core/service/Cms.service';
import { EnvironmentService } from 'src/app/core/service/environment.service';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

import { SimpleBlockComponent } from './blocks/simple-block/simple-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-cms',
  templateUrl: './page-cms.component.html',
  styleUrls: ['./page-cms.component.scss']
})
export class PageCMSComponent extends ExtendPageComponent implements OnInit {
  @ViewChild(CocoringCmsComponent, { static: false }) cocoringDatagridComponent!: CocoringCmsComponent;

  configCms: ConfigCmsModel;
  datasCms: SectionModel[] = [];

  constructor(
    public injector: Injector,
    private environmentService: EnvironmentService,
    private cmsService: CmsService,
    private storageService: StorageService) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Outils de CMS` })
    
    this.initConfigCms()

    /** on affiche à nouveau la config cms de la page sauvegardée en localstorage */
    this.datasCms = this.getDatasFromLocalstorage() || []
  }

  public getDatasFromLocalstorage(): SectionModel[] {
    return this.cmsService.adapterQuery(this.storageService.getLocalStorageItem('cms-page-save'))
  }

  public onSaveBtn(datas: SectionModel[]) {
    this.storageService.setLocalStorageItem('cms-page-save', datas)
  }

  private initConfigCms() {
    this.configCms = <ConfigCmsModel>{
      catalog: [
        new Block("CenterZoneTpl", {
          component: SimpleBlockComponent,
          filename: '1.jpg',
          label: 'bloc avec une zone de texte',
          backgroundColor: 'rgb(49 109 169)',
          content: {
            editor1: '<h1 style="text-align: center;"><span style="color: #ffffff;">Made with ❤️ by Cocorisoft</span></h1>'
          }
        }),
        new Block("CenterZoneTpl", {
          component: SimpleBlockComponent,
          filename: '1.jpg',
          label: 'bloc avec une zone de texte',
          backgroundColor: '#343a40',
          content: {
            editor1: '<h1 style="text-align: center;"><span style="color: #ffffff;">Made with ❤️ by Cocorisoft</span></h1>'
          }
        }),
      ],
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
