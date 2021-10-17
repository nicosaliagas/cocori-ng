import { Injectable } from '@angular/core';
import { SectionModel } from '@cocori-ng/lib/src/lib/feature-cms';

import { ReadonlyTemplatesClassesComponents, TemplatesClassesComponents } from '../model/Cms.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor() { }

  public adapterQueryEditor(sections: SectionModel[]): SectionModel[] {
    if (!sections) return []

    sections.forEach((section: SectionModel) => {
      section.component = TemplatesClassesComponents[section.key]
    })

    return sections
  }

  public adapterQueryReadOnly(sections: SectionModel[]): SectionModel[] {
    if (!sections) return []

    sections.forEach((section: SectionModel) => {
      section.componentReadonly = ReadonlyTemplatesClassesComponents[section.key]
    })

    return sections
  }
}
