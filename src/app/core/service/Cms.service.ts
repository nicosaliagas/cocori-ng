import { Injectable } from '@angular/core';
import { SectionModel } from 'cocori-ng/src/feature-cms';

import { EditorAdapterCmsBlocks, ReadonlyAdapterCmsBlocks } from '../model/Adapter-cms-blocks.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor() { }

  public adapterQueryEditor(sections: SectionModel[]): SectionModel[] {
    if (!sections) return []

    sections.forEach((section: SectionModel) => {
      section.component = EditorAdapterCmsBlocks[section.key]
    })

    return sections
  }

  public adapterQueryReadOnly(sections: SectionModel[]): SectionModel[] {
    if (!sections) return []

    sections.forEach((section: SectionModel) => {
      section.componentReadonly = ReadonlyAdapterCmsBlocks[section.key]
    })

    return sections
  }
}
