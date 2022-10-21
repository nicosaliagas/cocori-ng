import { ChangeDetectionStrategy, Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfigAPIsFile, ConfigUploaderModel } from 'cocori-ng/src/feature-core';

import { ExtendInputsComponent } from '../form/inputs/extend-inputs/extend-inputs.component';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader',
  templateUrl: './cocoring-uploader.component.html',
  styleUrls: ['./cocoring-uploader.component.scss'],
})
export class CocoringUploaderComponent extends ExtendInputsComponent implements OnInit, OnDestroy {
  apisFile: ConfigAPIsFile;

  @Input()
  set config(config: ConfigUploaderModel) {
    if (!config) {
      throw new Error(`La config du composant uploader n'est pas correcte... config: ${config}`);
    }

    this.configInput(config)

    this.addArrayForm();

    this.apisFile = { apiFile: config.apiFile, apiFileDownload: config.apiFileDownload }
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() { }

  ngOnDestroy() { }
}
