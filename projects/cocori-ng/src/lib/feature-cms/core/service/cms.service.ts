import { Injectable } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subject } from 'rxjs';

import { BlockModel, SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  public sectionAdded$: Subject<SectionModel> = new Subject<SectionModel>();

  public sections: SectionModel[] = []
  private blocksDesign: BlockModel[]

  constructor(private helperService: HelperService) { }

  public set catalog(datas: BlockModel[]) {
    this.blocksDesign = datas
  }

  public get catalog() {
    return this.blocksDesign
  }

  public addSection(newBlock: BlockModel) {

    const newSection: SectionModel = {
      idSection: this.helperService.generateGuid(), 
      block: newBlock}

    this.sections.push(newSection)

    this.sectionAdded$.next(newSection)
  }
}
