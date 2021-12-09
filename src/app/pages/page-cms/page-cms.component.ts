import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CocoringCmsComponent, SectionModel } from '@cocori-ng/lib/src/lib/feature-cms';
import { ConfigCmsModel } from '@cocori-ng/lib/src/lib/feature-cms/core/model/cms.model';
import { Block } from '@cocori-ng/lib/src/lib/feature-cms/core/service/block';
import { StorageService } from '@cocori-ng/lib/src/lib/feature-core';
import { CmsService } from 'src/app/core/service/Cms.service';
import { EnvironmentService } from 'src/app/core/service/environment.service';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

import { CenterZoneTplComponent } from './blocks/center-zone/center-zone.component';
import { ImageFullTextComponent } from './blocks/image-full-text/image-full-text.component';
import { TextImageFullComponent } from './blocks/text-image-full/text-image-full.component';
import { TitleTwoZonesComponent } from './blocks/title-two-zones/title-two-zones.component';
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
        new Block("CenterZone", {
          component: CenterZoneTplComponent,
          filename: '1.jpg',
          label: 'bloc avec une zone de texte',
          backgroundColor: '#343a40',
          content: {
            editor1: '<h1 style="text-align: center;"><span style="color: #ffffff;">Made with ❤️ by Cocorisoft</span></h1>'
          }
        }),
        new Block("CenterZone", {
          component: CenterZoneTplComponent,
          filename: '2.jpg',
          label: 'bloc avec une zone de texte',
          backgroundColor: '#ffffff',
          content: {
            editor1: '<h1 style="text-align: center;"><span style="color: #000000;">Cocorisoft Design Blocks</span></h1>'
          }
        }),
        new Block("TwoZonesH", {
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
        new Block("TwoZonesH", {
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
        new Block("TitleTwoZones", {
          component: TitleTwoZonesComponent,
          filename: '5.jpg',
          label: 'bloc avec un titre et deux zones de texte en deuxième ligne',
          backgroundColor: '#ffffff',
          content: {
            editor1: `
            <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
            `,
            editor2: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
            `,
            editor3: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><span style="font-size: 12pt;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet porta tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
            `
          }
        }),
        new Block("TitleTwoZones", {
          component: TitleTwoZonesComponent,
          filename: '6.jpg',
          label: 'bloc avec un titre et deux zones en deuxième ligne : une image et une zone de texte',
          backgroundColor: '#fff',
          content: {
            editor1: `
            <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
            `,
            editor2: `
            <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Smiley" src="https://localhost:8080/api/upload/image/smiley-happy.png" alt="" width="227" height="227" /></p>
            `,
            editor3: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
            `
          }
        }),
        new Block("TitleTwoZones", {
          component: TitleTwoZonesComponent,
          filename: '7.jpg',
          label: 'bloc avec un titre et deux zones en deuxième ligne : une zone de texte et une image',
          backgroundColor: '#e4ebec',
          content: {
            editor1: `
            <div style="text-align: center;"><strong><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></strong></div>
            `,
            editor2: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
            `,
            editor3: `
            <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Smiley" src="https://localhost:8080/api/upload/image/shape.png" alt="" width="227" height="227" /></p>
            `,
          }
        }),

        new Block("TextImageFull", {
          component: TextImageFullComponent,
          filename: '8.jpg',
          label: 'bloc avec deux zones : une zone de texte et une image qui prends toute la moitiée de la section',
          backgroundColor: '#e4e4e2',
          content: {
            editor1: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
            `,
            backgroundImage1: `https://localhost:8080/api/upload/image/office.jpg`
          }
        }),

        new Block("ImageFullText", {
          component: ImageFullTextComponent,
          filename: '9.jpg',
          label: 'bloc avec deux zones : une zone de texte et une image qui prends toute la moitiée de la section',
          backgroundColor: '#e4e4e2',
          content: {
            backgroundImage1: `https://localhost:8080/api/upload/image/openspace.jpg`,
            editor1: `
            <div><span style="font-size: 18pt;">Cocorisoft Design Blocks</span></div>
            <div>&nbsp;</div>
            <div style="text-align: left; line-height: 2;"><a title="Lorem ipsum" href="https://lipsum.cafe/">Lorem ipsum</a>&nbsp;dolor sit amet, consectetur adipiscing elit. Sed hendrerit lacus tempor odio malesuada, sit&nbsp;<a title="lipsum" href="https://lipsum.cafe/">lipsum</a>&nbsp;amet maximus est ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a tempor nisis actis. Duis vel elementum urna, rhoncus molestie ipsum. Nunc vel lobortis leo, at hendrerit urna. Suspendisse ut cursus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae lorem sed mauris ultrices viverra. Duis et tortor sed ex aliquam sollicitudin. Fusce aliquet erat id molestie tempor.</div>
            `
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
