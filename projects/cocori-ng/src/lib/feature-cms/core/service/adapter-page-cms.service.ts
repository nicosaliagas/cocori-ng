import { Injectable } from '@angular/core';

import { AdapterWritePagCmsModel } from '../model/adapter-cms.model';
import { SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterPageCmsService {

  adapterWrite(sections: SectionModel[]) {
    const pageCmsExport: AdapterWritePagCmsModel[] = []

    sections.forEach((section: SectionModel) => {
      pageCmsExport.push({
        backgroundColor: section.backgroundColor,
        template: section.block.component,
        values: section.values
      })
    });

    console.log("pageCmsExport>>>", pageCmsExport)

    return pageCmsExport
  }
}