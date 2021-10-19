import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CocoringCmsComponent, SectionModel } from '@cocori-ng/lib/src/lib/feature-cms';
import { ConfigCmsModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';
import { Block } from '@cocori-ng/lib/src/lib/feature-cms/core/service/block';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { CmsService } from 'src/app/core/service/Cms.service';
import { EnvironmentService } from 'src/app/core/service/environment.service';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

import { CenterZoneTplComponent } from './blocks/center-zone/center-zone.component';
import { TwoZonesHComponent } from './blocks/two-zones-h/two-zones-h.component';

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
    return this.cmsService.adapterQueryEditor(this.storageService.getLocalStorageItem('cms-page-save'))
  }

  public onSaveBtn(datas: SectionModel[]) {
    this.storageService.setLocalStorageItem('cms-page-save', datas)
  }

  private initConfigCms() {
    this.configCms = <ConfigCmsModel>{
      catalog: [
        new Block("CenterZoneTpl", {
          component: CenterZoneTplComponent,
          filename: '1.jpg',
          label: 'bloc avec une zone de texte',
          backgroundColor: '#343a40',
          content: {
            editor1: '<h1 style="text-align: center;"><span style="color: #ffffff;">Made with ❤️ by Cocorisoft</span></h1>'
          }
        }),
        new Block("CenterZoneTpl", {
          component: CenterZoneTplComponent,
          filename: '2.jpg',
          label: 'bloc avec une zone de texte',
          backgroundColor: '#ffffff',
          content: {
            editor1: '<h1 style="text-align: center;"><span style="color: #000000;">Cocorisoft Design Blocks</span></h1>'
          }
        }),
        new Block("TwoZonesHTpl", {
          component: TwoZonesHComponent,
          filename: '3.jpg',
          label: 'bloc avec une image et une zone de texte',
          backgroundColor: '#f0eaea',
          content: {
            editor1: `<p><img style="float: right;" title="phone.jpg" src="https://localhost:8080/api/upload/image/phone.jpg" alt="" width="378" height="251" /></p>`,
            editor2: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>`,
          }
        }),
        new Block("TwoZonesHTpl", {
          component: TwoZonesHComponent,
          filename: '4.jpg',
          label: 'bloc avec une zone de texte et une image',
          backgroundColor: '#f7f7f7',
          content: {
            editor1: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
            `,
            editor2: `<p><img style="display: block; margin-left: auto; margin-right: auto;" title="phone.jpg" src="https://localhost:8080/api/upload/image/desk.jpg" alt="" width="378" height="251" /></p>`,
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
