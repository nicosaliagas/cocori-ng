import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SectionPageDatasModel } from '../../../core/model/adapter-cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-readonly',
  templateUrl: './cocoring-cms-readonly.component.html',
  styleUrls: ['./cocoring-cms-readonly.component.scss']
})
export class CocoringCmsReadonlyComponent implements OnInit {
  sectionPageDatas: SectionPageDatasModel[];

  @Input()
  set config(datas: SectionPageDatasModel[]) {
    if (!datas) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${datas}`);
    }

    this.sectionPageDatas = datas

    console.log("SectionPageDatasModel >>>> ", datas)
  }

  constructor() { }

  ngOnInit(): void {
  }

  trackBy(index: number) {
    return index;
  }
}
