import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfigCmsModel, SectionModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionComponent } from '../cocoring-cms-section/cocoring-cms-section.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms',
  templateUrl: './cocoring-cms.component.html',
  styleUrls: ['./cocoring-cms.component.scss']
})
export class CocoringCmsComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('ContainerRef', { static: false, read: ViewContainerRef }) containerRef: ViewContainerRef;
  configCms: ConfigCmsModel;

  @Input()
  set config(config: ConfigCmsModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.configCms = config
  }

  responsive: string = 'computer'
  subscription: Subscription = new Subscription();
  activeMediaQuery = '';
  sidenavMode: string = 'side'
  isSidenavOpen: boolean = false;
  totalSections: number = 0;

  constructor(
    mediaObserver: MediaObserver,
    private cdr: ChangeDetectorRef,
    private cmsService: CmsService,
    private injectComponentService: InjectComponentService,
  ) {
    this.eventSizeScreen(mediaObserver);
  }

  ngOnInit(): void {
    this.addSectionEvent()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private eventSizeScreen(mediaObserver: MediaObserver) {
    this.subscription.add(
      mediaObserver.media$.subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

        if (change.mqAlias === 'xs') {
          this.sidenavMode = 'over';
        } else {
          this.sidenavMode = 'side';
        }
      })
    );
  }

  toggleSidenavBlocks() {
    this.sidenav.toggle()

    this.isSidenavOpen = this.sidenav.opened
  }

  addSectionEvent() {
    this.subscription.add(
      this.cmsService.sectionAdded$.pipe(
        tap(_ => this.totalSections = this.cmsService.sections.length),
        tap(_ => this.cdr.detectChanges()),
        tap((datas: SectionModel) => {

          console.log("New Section : ", datas)

          this.injectComponentService.loadAndAddComponentToContainer(CocoringCmsSectionComponent, this.containerRef,
            [{ section: datas }, { wysiwyg: this.configCms.wysiwygOptions }], null
          )
        }),
      ).subscribe()
    )
  }
}
