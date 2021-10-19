import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AutoUnsubscribeComponent, InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';
import { tap } from 'rxjs/operators';

import {
  ConfigCmsModel,
  InsertSectionAt,
  SectionModel,
  SectionModelCommand,
  SectionMoveIndexes,
} from '../../../core/model/cms.model';
import { Block } from '../../../core/service/block';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionComponent } from '../cocoring-cms-section/cocoring-cms-section.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms',
  templateUrl: './cocoring-cms.component.html',
  styleUrls: ['./cocoring-cms.component.scss'],
  providers: [InjectComponentService]
})
export class CocoringCmsComponent extends AutoUnsubscribeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('ContainerRef', { static: false, read: ViewContainerRef }) containerRef: ViewContainerRef;
  
  configCms: ConfigCmsModel;
  catalog: Block[] = []
  orientation = 'column'
  _showSaveBtn: boolean = false;
  importSections: SectionModel[] = [];

  @Input()
  set config(config: ConfigCmsModel) {
    if (!config) {
      throw new Error(`La config du composant CMS n'est pas correcte... config: ${config}`);
    }

    this.configCms = config

    this.catalog = config.catalog

    this.cmsService.init()
  }

  @Input()
  set datas(sectionDatas: SectionModel[]) {
    this.importSections = sectionDatas
  }

  @Input()
  set showSaveBtn(data: boolean) {
    this._showSaveBtn = data

    if (data) {
      this.onPageSaved()
    }
  }

  @Output() onSaveBtn: EventEmitter<SectionModel[]> = new EventEmitter<SectionModel[]>();

  responsive: string = 'computer'
  activeMediaQuery = '';
  sidenavMode: string = 'side'
  isSidenavOpen: boolean = false;
  totalSections: number = 0;

  constructor(
    private mediaObserver: MediaObserver,
    private cdr: ChangeDetectorRef,
    private cmsService: CmsService,
    private injectComponentService: InjectComponentService,
  ) {
    super()

    this.eventSizeScreen();
  }

  ngOnInit(): void {
    this.addSectionEvent()

    this.onSectionMoved()

    /** on dessine les sections chargées ! */
    if (this.importSections.length) {
      this.importSections.forEach((section: SectionModel) => {
        this.cmsService.addSection(section)
      })
    }
  }

  private onPageSaved() {
    this.subscriptions.add(
      this.cmsService.onSaveCmsContent$.subscribe((contentPage: SectionModel[]) => {
        this.onSaveBtn.emit(contentPage)
      })
    )
  }

  private eventSizeScreen() {
    this.subscriptions.add(
      this.mediaObserver.media$.subscribe((change: MediaChange) => {
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

    this.cmsService.catalogBlocksOpened$.next(this.isSidenavOpen)
  }

  public getPageCMSDatas(): SectionModelCommand[] {
    return this.cmsService.sectionsPageDatas()
  }

  private addSectionEvent() {
    this.subscriptions.add(
      this.cmsService.sectionAdded$.pipe(
        tap(_ => this.refreshNumberSection()),
        tap((datas: InsertSectionAt) => {

          console.log("#4 - datas.section", datas.section)

          this.injectComponentService.loadAndAddComponentToContainer(CocoringCmsSectionComponent, this.containerRef,
            [{ section: datas.section }, { apisConfig: this.configCms.wysiwygOptions }],
            { afterRemoveAnimation: (sectionIndexRemoved: number) => this.onSectionRemovedAfterAnimation(sectionIndexRemoved) }, datas.index
          )
        }),
      ).subscribe()
    )
  }

  private onSectionRemovedAfterAnimation(indexSectionRemoved: number) {
    this.injectComponentService.removeComponentFromViewContainer(indexSectionRemoved, this.containerRef)

    this.refreshNumberSection()
  }

  private onSectionMoved() {
    this.subscriptions.add(
      this.cmsService.moveSection$.pipe(
        tap((values: any) => {
          this.moveSectionContainer({ previousIndex: values.previousIndex, currentIndex: values.currentIndex })
        }),
      ).subscribe()
    )
  }

  private refreshNumberSection() {
    this.totalSections = this.cmsService.sections.length

    this.cdr.detectChanges()
  }

  public dropSection(event: CdkDragDrop<any[]>) {
    this.moveSectionContainer({ previousIndex: event.previousIndex, currentIndex: event.currentIndex })
  }

  private moveSectionContainer(moveIndexes: SectionMoveIndexes) {
    moveItemInArray(this.cmsService.sections, moveIndexes.previousIndex, moveIndexes.currentIndex);

    this.injectComponentService.moveComponentFromViewContainer(moveIndexes.currentIndex, moveIndexes.previousIndex, this.containerRef)
  }
}
