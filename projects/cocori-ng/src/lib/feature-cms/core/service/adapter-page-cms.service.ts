import { Injectable } from '@angular/core';

import { SectionModel } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterPageCmsService {

  /** adapteur en écriture */
  public adapterCommand(sections: SectionModel[]) {
    const pageCmsExport: SectionModel[] = []

    sections.forEach((section: SectionModel) => {
      pageCmsExport.push({
        id: section.id,
        backgroundColor: section.backgroundColor,
        key: section.key,
        component: null,
        values: section.values
      })
    });

    return pageCmsExport
  }

  /** adapteur lecture */
  public adapterQuery(sectionDatas: SectionModel[]): SectionModel[] {
    const pageCMSImport: SectionModel[] = []

    sectionDatas.forEach((section: SectionModel) => {
      pageCMSImport.push({
        id: section.id,
        key: section.key,
        component: null,
        values: section.values,
        backgroundColor: section.backgroundColor
      })
    })

    return pageCMSImport
  }
}