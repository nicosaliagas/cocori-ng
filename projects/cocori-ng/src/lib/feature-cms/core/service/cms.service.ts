import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { BlockModel, SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  public blockAdded$: Subject<BlockModel> = new Subject<BlockModel>();

  public sections: SectionModel[] = []
  private blocksDesign: BlockModel[]

  constructor() { }

  public set catalog(datas: BlockModel[]) {
    this.blocksDesign = datas
  }

  public get catalog() {
    return this.blocksDesign
  }

  public addSection(newBlock: BlockModel) {
    this.sections.push({idSection: 'rr', idBlock: newBlock.idBlock})

    this.blockAdded$.next(newBlock)
  }
}
