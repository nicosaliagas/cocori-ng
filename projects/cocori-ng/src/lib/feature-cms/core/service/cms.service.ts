import { Injectable } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BlockModel, SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  public sectionAdded$: Subject<SectionModel> = new Subject<SectionModel>();
  public catalogBlocksOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pageContentSaved$: Subject<void> = new Subject<void>();
  private pageContentRefresh$: Subject<void> = new Subject<void>();

  public sections: SectionModel[] = []
  private blocksDesign: BlockModel[]

  constructor(private helperService: HelperService) { }

  public set catalog(datas: BlockModel[]) {
    this.blocksDesign = datas
  }

  public get catalog() {
    return this.blocksDesign
  }

  public onPageRefreshed(): Subject<void> {
    return this.pageContentRefresh$
  }

  public onContentPageSaved(): Subject<void> {
    return this.pageContentSaved$
  }

  public saveContentPage() {
    this.pageContentSaved$.next()
  }

  public addSection(newBlock: BlockModel) {
    const newSection: SectionModel = {
      idSection: this.helperService.generateGuid(),
      block: newBlock,
      values: []
    }

    this.sections.push(newSection)

    this.sectionAdded$.next(newSection)
  }

  public removeSection(sectionId: string) {
    const index: number = this.sections.findIndex((section: SectionModel) => section.idSection === sectionId)

    this.sections.splice(index, 1)

    console.log("sections :::: ", this.sections)

    this.pageContentRefresh$.next()
  }
}
