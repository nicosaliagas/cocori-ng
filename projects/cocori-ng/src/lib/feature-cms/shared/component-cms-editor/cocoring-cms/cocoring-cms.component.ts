import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SectionPageDatasModel } from '../../../core/model/adapter-cms.model';
import { ConfigCmsModel, InsertSectionAt, SectionMoveIndexes } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionComponent } from '../cocoring-cms-section/cocoring-cms-section.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms',
  templateUrl: './cocoring-cms.component.html',
  styleUrls: ['./cocoring-cms.component.scss'],
  providers: [InjectComponentService]
})
export class CocoringCmsComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('ContainerRef', { static: false, read: ViewContainerRef }) containerRef: ViewContainerRef;
  configCms: ConfigCmsModel;

  orientation = 'column'
  _showSaveBtn: boolean = false;

  @Input()
  set config(config: ConfigCmsModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.configCms = config

    this.cmsService.init()
  }

  @Input()
  set showSaveBtn(data: boolean) {
    this._showSaveBtn = data

    if (data) {
      this.onPageSaved()
    }
  }

  @Output() onSaveBtn: EventEmitter<SectionPageDatasModel[]> = new EventEmitter<SectionPageDatasModel[]>();

  responsive: string = 'computer'
  subscription: Subscription = new Subscription();
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
    this.eventSizeScreen();
  }

  ngOnInit(): void {
    this.addSectionEvent()

    this.onSectionRemoved()

    this.onSectionMoved()
  }

  private onPageSaved() {
    this.subscription.add(
      this.cmsService.onSaveCmsContent$.subscribe((contentPage: SectionPageDatasModel[]) => {
        this.onSaveBtn.emit(contentPage)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private eventSizeScreen() {
    this.subscription.add(
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

  public getPageCMSDatas(): SectionPageDatasModel[] {
    return this.cmsService.sectionsPageDatas()
  }

  private addSectionEvent() {
    this.subscription.add(
      this.cmsService.sectionAdded$.pipe(
        tap(_ => this.refreshNumberSection()),
        tap((datas: InsertSectionAt) => {
          this.injectComponentService.loadAndAddComponentToContainer(CocoringCmsSectionComponent, this.containerRef,
            [{ section: datas.section }, { apisConfig: this.configCms.wysiwygOptions }], null, datas.index
          )
        }),
      ).subscribe()
    )
  }

  private onSectionRemoved() {
    this.subscription.add(
      this.cmsService.onSectionRemoved().pipe(
        tap((indexSection: number) => {
          this.injectComponentService.removeComponentFromViewContainer(indexSection, this.containerRef)
        }),
        tap(_ => this.refreshNumberSection()),
      ).subscribe()
    )
  }

  private onSectionMoved() {
    this.subscription.add(
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
