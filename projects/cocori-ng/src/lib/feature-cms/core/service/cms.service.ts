import { Injectable } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { BehaviorSubject, Subject } from 'rxjs';

import { InsertSectionAt, SectionModel } from '../model/cms.model';
import { Block } from './block';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  public sectionAdded$: Subject<InsertSectionAt> = new Subject<InsertSectionAt>();
  public catalogBlocksOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pageContentSaved$: Subject<void> = new Subject<void>();
  private sectionRemoved$: Subject<number> = new Subject<number>();

  public sections: SectionModel[] = []
  public blocks: Block[]

  constructor(private helperService: HelperService) { }

  public onSectionRemoved(): Subject<number> {
    return this.sectionRemoved$
  }

  public onContentPageSaved(): Subject<void> {
    return this.pageContentSaved$
  }

  public saveContentPage() {
    this.pageContentSaved$.next()
  }

  public addSection(fromBlock: Block) {
    const newSection: SectionModel = {
      idSection: this.helperService.generateGuid(),
      block: fromBlock,
      values: []
    }

    this.sections.push(newSection)

    this.sectionAdded$.next({ section: newSection })
  }

  public removeSection(sectionId: string) {
    const index: number = this.sections.findIndex((section: SectionModel) => section.idSection === sectionId)

    this.sections.splice(index, 1)

    console.log("sections :::: ", this.sections)

    this.sectionRemoved$.next(index)
  }

  public duplicateSection(section: SectionModel) {
    const index: number = this.sections.findIndex((s: SectionModel) => s.idSection === section.idSection)

    const newIndex: number = index + 1

    const sectionToDuplicate: SectionModel = this.sections[index]

    const sectionDuplicated: SectionModel = JSON.parse(JSON.stringify(sectionToDuplicate));

    sectionDuplicated.idSection = this.helperService.generateGuid()

    this.sections.splice(newIndex, 0, sectionDuplicated)

    console.log("duplicate section :::: ", sectionToDuplicate)

    console.log("sectionDuplicated", sectionDuplicated)

    console.log("sections", this.sections)

    this.sectionAdded$.next({ section: sectionDuplicated, index: newIndex })
  }
}
