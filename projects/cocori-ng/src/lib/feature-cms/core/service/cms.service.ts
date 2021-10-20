import { Injectable } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { BehaviorSubject, Subject } from 'rxjs';

import {
  InsertSectionAt,
  MoveOrientationSectionActions,
  SectionModel,
  SectionModelCommand,
  SectionMoveIndexes,
} from '../model/cms.model';
import { AdapterPageCmsService } from './adapter-page-cms.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  public sectionAdded$: Subject<InsertSectionAt> = new Subject<InsertSectionAt>();
  public catalogBlocksOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public backgroundColor$: Subject<string> = new Subject<string>();
  public moveSection$: Subject<SectionMoveIndexes> = new Subject<SectionMoveIndexes>();
  public onSaveCmsContent$: Subject<SectionModelCommand[]> = new Subject<SectionModelCommand[]>();
  private sectionRemoved$: Subject<InsertSectionAt> = new Subject<InsertSectionAt>();

  public sections: SectionModel[] = []

  constructor(
    private helperService: HelperService,
    private adapterPageCmsService: AdapterPageCmsService) {
    this.init()
  }

  public init() {
    this.sections.splice(0, this.sections.length)
  }

  public onSectionRemoved(): Subject<InsertSectionAt> {
    return this.sectionRemoved$
  }

  public sectionsPageDatas(): SectionModelCommand[] {
    return this.adapterPageCmsService.adapterCommand(this.sections)
  }

  public addSection(newSection: SectionModel) {
    this.sections.push(newSection)

    this.sectionAdded$.next({ section: newSection })
  }

  public getIndexCurrentSection(sectionId: string): number {
    return this.sections.findIndex((section: SectionModel) => section.id === sectionId)
  }

  public removeSection(sectionId: string) {
    const index: number = this.sections.findIndex((section: SectionModel) => section.id === sectionId)

    const sectionRemoved: SectionModel[] = this.sections.splice(index, 1)

    this.sectionRemoved$.next(<InsertSectionAt>{ index: index, section: sectionRemoved[0] })
  }

  public duplicateSection(section: SectionModel) {
    const index: number = this.sections.findIndex((s: SectionModel) => s.id === section.id)

    const newIndex: number = index + 1

    const sectionToDuplicate: SectionModel = this.sections[index]

    const sectionDuplicated: SectionModel = JSON.parse(JSON.stringify(sectionToDuplicate));

    sectionDuplicated.key = sectionToDuplicate.key
    sectionDuplicated.id = this.helperService.generateGuid()

    this.sections.splice(newIndex, 0, sectionDuplicated)

    this.sectionAdded$.next({ section: sectionDuplicated, index: newIndex })
  }

  public changeBackgroundColorSection(idSection: string, value: string) {
    const section: SectionModel = this.sections.find((s: SectionModel) => s.id === idSection)

    section.backgroundColor = value

    this.backgroundColor$.next(idSection)
  }

  public moveSection(idSection: string, orientation: MoveOrientationSectionActions) {
    const previousIndex: number = this.sections.findIndex((s: SectionModel) => s.id === idSection)
    let currentIndex: number = previousIndex

    if (orientation === 'move-up' && previousIndex > 0) {
      currentIndex = previousIndex - 1
    } else if (orientation === 'move-down' && previousIndex < this.sections.length - 1) {
      currentIndex = previousIndex + 1
    }

    this.moveSection$.next({ previousIndex: previousIndex, currentIndex: currentIndex })
  }
}
