import { Injectable } from '@angular/core';

import { SectionPageDatasModel } from '../model/adapter-cms.model';
import { SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterPageCmsService {

  public adapterWrite(sections: SectionModel[]) {
    const pageCmsExport: SectionPageDatasModel[] = []

    sections.forEach((section: SectionModel) => {
      pageCmsExport.push({
        id: section.idSection,
        backgroundColor: section.backgroundColor,
        template: section.block.component,
        values: section.values
      })
    });

    return pageCmsExport
  }

  public adapterRead(sectionDatas: SectionPageDatasModel[]): SectionModel[] {
    const pageCMSImport: SectionModel[] = []

    sectionDatas.forEach((section: SectionPageDatasModel) => {
      pageCMSImport.push({
        idSection: section.id,
        block: {
          component: section.template,
          data: {
            idBlock: null,
            filename: null,
            label: null,
            backgroundColor: null,
            content: null
          }
        },
        values: section.values,
        backgroundColor: section.backgroundColor
      })
    })

    return pageCMSImport
  }
}