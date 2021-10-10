import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SectionModel } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-readonly',
  templateUrl: './cocoring-cms-readonly.component.html',
  styleUrls: ['./cocoring-cms-readonly.component.scss']
})
export class CocoringCmsReadonlyComponent implements OnInit {
  sectionPageDatas: SectionModel[];

  @Input()
  set config(datas: SectionModel[]) {
    if (!datas) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${datas}`);
    }

    this.sectionPageDatas = datas
  }

  constructor() { }

  ngOnInit(): void {
  }

  trackBy(index: number) {
    return index;
  }
}
