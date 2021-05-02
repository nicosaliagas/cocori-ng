import { Injectable } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { BehaviorSubject, Subject } from 'rxjs';

import { AdapterWritePagCmsModel } from '../model/adapter-cms.model';
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
  private sectionRemoved$: Subject<number> = new Subject<number>();

  public sections: SectionModel[] = []
  public blocks: Block[]

  constructor(
    private helperService: HelperService,
    private adapterPageCmsService: AdapterPageCmsService) { }

  public onSectionRemoved(): Subject<number> {
    return this.sectionRemoved$
  }

  public exportPage() {
    const pageExported: AdapterWritePagCmsModel[] =  this.adapterPageCmsService.adapterWrite(this.sections)

    console.log("pageExported", pageExported)
  }

  public addSection(fromBlock: Block) {
    const newSection: SectionModel = {
      idSection: this.helperService.generateGuid(),
      block: fromBlock,
      backgroundColor: fromBlock.data.backgroundColor,
      values: null
    }

    this.sections.push(newSection)

    this.sectionAdded$.next({ section: newSection })
  }

  public removeSection(sectionId: string) {
    const index: number = this.sections.findIndex((section: SectionModel) => section.idSection === sectionId)

    this.sections.splice(index, 1)

    this.sectionRemoved$.next(index)
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
