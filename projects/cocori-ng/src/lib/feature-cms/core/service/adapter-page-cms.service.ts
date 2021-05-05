import { Injectable } from '@angular/core';

import { SectionPageDatasModel } from '../model/adapter-cms.model';
import { SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterPageCmsService {

  adapterWrite(sections: SectionModel[]) {
    const pageCmsExport: SectionPageDatasModel[] = []

    sections.forEach((section: SectionModel) => {
      pageCmsExport.push({
        backgroundColor: section.backgroundColor,
        template: section.block.component,
        values: section.values
      })
    });
    
    return pageCmsExport
  }
}