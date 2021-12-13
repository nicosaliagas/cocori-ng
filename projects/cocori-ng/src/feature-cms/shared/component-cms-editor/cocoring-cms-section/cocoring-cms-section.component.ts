import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InjectComponentService } from 'cocori-ng/src/feature-core';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { ApisConfigCmsModel, InsertSectionAt as SectionIndex, SectionModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['../../section-styles/section-styles.component.scss', './cocoring-cms-section.component.scss'],
  providers: [MatBottomSheet]
})
export class CocoringCmsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  @Input() section: SectionModel
  @Input() apisConfig: ApisConfigCmsModel
  @Output() afterRemoveAnimation = new EventEmitter();

  readOnly: boolean = true;
  indexSectionRemoved: number;

  private readonly destroy$ = new Subject();

  animationDone(event: AnimationEvent) {
    if (event.animationName === 'sectionOut') {
      this.afterRemoveAnimation.emit(this.indexSectionRemoved);
    }
  }

  constructor(
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private cmsService: CmsService,
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void {
    this.addTemplateSectionComponent()

    this.catalogBlocksOpenedEvent()

    this.onSectionRemoved()
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  get container(): HTMLElement {
    return this.host.nativeElement.querySelector('.cms-section') as HTMLElement;
  }

  removeSection() {
    this.container.style.animation = 'sectionOut 0.3s';
  }

  private onSectionRemoved() {
    this.cmsService.onSectionRemoved().pipe(
      takeUntil(this.destroy$),
      filter((sectionRemoved: SectionIndex) => sectionRemoved.section.id === this.section.id),
      tap((sectionRemoved: SectionIndex) => this.indexSectionRemoved = sectionRemoved.index),
      tap(_ => this.removeSection()),
    ).subscribe()
  }

  private catalogBlocksOpenedEvent() {
    this.cmsService.catalogBlocksOpened$.pipe(
      takeUntil(this.destroy$),
      tap((isOpened: boolean) => {
        this.readOnly = isOpened
      }),
      tap(_ => this.cdr.detectChanges())
    ).subscribe()
  }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(this.section.component, this.containerRef,
      [{ section: this.section }, { apisConfig: this.apisConfig }], null)
  }
}
