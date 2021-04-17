import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SectionModel } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['./cocoring-cms-section.component.scss']
})
export class CocoringCmsSectionComponent implements OnInit {

  @Input() section: SectionModel

  constructor() { }

  ngOnInit(): void {
    console.log("datas section", this.section)
  }
}
