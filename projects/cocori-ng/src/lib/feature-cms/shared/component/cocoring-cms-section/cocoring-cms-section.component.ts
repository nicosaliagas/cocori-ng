import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigWysiwygModel, InitWysiwyg } from '@cocori-ng/lib/src/lib/feature-core';

import { SectionModel, WysiwygSectionCmsModel } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['./cocoring-cms-section.component.scss']
})
export class CocoringCmsSectionComponent implements OnInit {

  @Input() section: SectionModel
  @Input() wysiwyg: WysiwygSectionCmsModel

  formulaire: FormGroup
  _configInline: ConfigWysiwygModel;

  constructor(private fb: FormBuilder,) {
    this.formulaire = this.fb.group({});
  }

  ngOnInit(): void {
    console.log("datas section", this.section)
    console.log("datas wysiwyg 😁 ", this.wysiwyg)

    this._configInline = this.initConfigComponent("editorInline", true)
  }

  private initConfigComponent(nameControl: string, inline: boolean) {
    let config = {
      apiFile: this.wysiwyg.apiFile,
      apiFileDownload: this.wysiwyg.apiFileDownload,
      apiKey: this.wysiwyg.apiKey,
      params: <InitWysiwyg>{
        inline: inline
      },
      nameLabel: '',
      formGroup: this.formulaire,
      nameControl: nameControl,
      validators: []
    }

    return config
  }

  callback(controlName: string) {
    this.formulaire.get(controlName).setValue(this.section.block.content.texte)
  }
}
