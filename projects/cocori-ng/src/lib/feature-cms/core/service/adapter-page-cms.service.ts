import { Injectable } from '@angular/core';

import { SectionModel, SectionModelCommand } from '../model/cms.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterPageCmsService {

  /** Adapteur en écriture 
   *  on retourne au back les sections sans les propriétés component et componentReadonly (deconstruct) non utiles pour le back
  */
  public adapterCommand(sections: SectionModel[]): SectionModelCommand[] {
    return sections.map(({ component, componentReadonly, ...attributes }) => attributes)
  }
}