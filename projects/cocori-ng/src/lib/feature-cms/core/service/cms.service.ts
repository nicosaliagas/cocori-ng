import { Injectable } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SectionPageDatasModel } from '../model/adapter-cms.model';
import { InsertSectionAt, MoveOrientationSectionActions, SectionModel, SectionMoveIndexes } from '../model/cms.model';
import { AdapterPageCmsService } from './adapter-page-cms.service';
import { Block } from './block';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  public sectionAdded$: Subject<InsertSectionAt> = new Subject<InsertSectionAt>();
  public catalogBlocksOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public backgroundColor$: Subject<string> = new Subject<string>();
  public moveSection$: Subject<SectionMoveIndexes> = new Subject<SectionMoveIndexes>();
  public onSaveCmsContent$: Subject<SectionPageDatasModel[]> = new Subject<SectionPageDatasModel[]>();
  private sectionRemoved$: Subject<InsertSectionAt> = new Subject<InsertSectionAt>();

  public sections: SectionModel[] = []
  public blocks: Block[]

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

  public sectionsPageDatas(): SectionPageDatasModel[] {
    return this.adapterPageCmsService.adapterWrite(this.sections)
  }

  public importSections(datas: SectionPageDatasModel[]): SectionModel[] {
    return this.adapterPageCmsService.adapterRead(datas)
  }

  public addSection(newSection: SectionModel) {

    this.sections.push(newSection)

    this.sectionAdded$.next({ section: newSection })
  }

  public getIndexCurrentSection(sectionId: string): number {
    return this.sections.findIndex((section: SectionModel) => section.idSection === sectionId)
  }

  public removeSection(sectionId: string) {
    const index: number = this.sections.findIndex((section: SectionModel) => section.idSection === sectionId)

    const sectionRemoved: SectionModel[] = this.sections.splice(index, 1)

    this.sectionRemoved$.next(<InsertSectionAt>{ index: index, section: sectionRemoved[0] })
  }

  public duplicateSection(section: SectionModel) {
    const index: number = this.sections.findIndex((s: SectionModel) => s.idSection === section.idSection)

    const newIndex: number = index + 1

    const sectionToDuplicate: SectionModel = this.sections[index]

    const sectionDuplicated: SectionModel = JSON.parse(JSON.stringify(sectionToDuplicate));

    sectionDuplicated.block.component = sectionToDuplicate.block.component
    sectionDuplicated.idSection = this.helperService.generateGuid()

    this.sections.splice(newIndex, 0, sectionDuplicated)

    this.sectionAdded$.next({ section: sectionDuplicated, index: newIndex })
  }

  public changeBackgroundColorSection(idSection: string, value: string) {
    const section: SectionModel = this.sections.find((s: SectionModel) => s.idSection === idSection)

    section.backgroundColor = value

    this.backgroundColor$.next(idSection)
  }

  public moveSection(idSection: string, orientation: MoveOrientationSectionActions) {
    const previousIndex: number = this.sections.findIndex((s: SectionModel) => s.idSection === idSection)
    let currentIndex: number = previousIndex

    if (orientation === 'move-up' && previousIndex > 0) {
      currentIndex = previousIndex - 1
    } else if (orientation === 'move-down' && previousIndex < this.sections.length - 1) {
      currentIndex = previousIndex + 1
    }

    this.moveSection$.next({ previousIndex: previousIndex, currentIndex: currentIndex })
  }
}
