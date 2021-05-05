import { Component, Input, OnInit } from '@angular/core';

import { SectionPageDatasModel } from '../../../../core/model/adapter-cms.model';

@Component({
  selector: 'cocoring-loader',
  templateUrl: './cocoring-loader.component.html',
  styleUrls: ['./cocoring-loader.component.scss']
})
export class CocoringLoaderComponent implements OnInit {

  @Input()
  set config(sectionPageDatasModel: SectionPageDatasModel[]) {
    if (!sectionPageDatasModel) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${sectionPageDatasModel}`);
    }

    console.log("SectionPageDatasModel >>>> ", sectionPageDatasModel)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
