import { Injectable } from '@angular/core';
import { SectionModel } from '@cocori-ng/lib/src/lib/feature-cms';

import { TemplatesClassesComponents } from '../model/Cms.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor() { }

  public adapterQuery(sections: SectionModel[]): SectionModel[] {
    if (!sections) return []

    sections.forEach((section: SectionModel) => {
      section.component = TemplatesClassesComponents[section.key]
    })

    return sections
  }
}
