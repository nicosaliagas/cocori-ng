import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AutoUnsubscribeComponent, InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, tap } from 'rxjs/operators';

import { TemplatesClassesComponents } from '../../../core/model/adapter-cms.model';
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
export class CocoringCmsSectionComponent extends AutoUnsubscribeComponent implements OnInit {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  @Input() blockComponent: Type<any>
  @Input() section: SectionModel
  @Input() apisConfig: ApisConfigCmsModel
  @Output() afterRemoveAnimation = new EventEmitter();

  readOnly: boolean = true;
  indexSectionRemoved: number;

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
  ) {
    super()
  }

  ngOnInit(): void {

    console.log("blockComponent >>> ", this.blockComponent)

    this.addBlockComponentTest(this.blockComponent)

    this.addTemplateSectionComponent()

    this.catalogBlocksOpenedEvent()

    this.onSectionRemoved()
  }

  get container(): HTMLElement {
    return this.host.nativeElement.querySelector('.cms-section') as HTMLElement;
  }

  removeSection() {
    this.container.style.animation = 'sectionOut 0.3s';
  }

  private onSectionRemoved() {
    this.subscriptions.add(
      this.cmsService.onSectionRemoved().pipe(
        filter((sectionRemoved: SectionIndex) => sectionRemoved.section.idSection === this.section.idSection),
        tap((sectionRemoved: SectionIndex) => this.indexSectionRemoved = sectionRemoved.index),
        tap(_ => this.removeSection()),
      ).subscribe()
    )
  }

  private catalogBlocksOpenedEvent() {
    this.subscriptions.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          this.readOnly = isOpened
        }),
        tap(_ => this.cdr.detectChanges())
      ).subscribe()
    )
  }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(TemplatesClassesComponents[this.section.block.component], this.containerRef,
      [{ section: this.section }, { apisConfig: this.apisConfig }], null)
  }

  private addBlockComponentTest(component: any) {
    this.injectComponentService.loadAndAddComponentToContainer(component, this.containerRef,
      [{ section: this.section }, { apisConfig: this.apisConfig }], null)
  }
}
