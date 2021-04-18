import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigWysiwygModel, InitWysiwyg } from '@cocori-ng/lib/src/lib/feature-core';

import { SectionModel } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['./cocoring-cms-section.component.scss']
})
export class CocoringCmsSectionComponent implements OnInit {

  @Input() section: SectionModel

  formulaire: FormGroup
  _configInline: ConfigWysiwygModel;

  constructor(private fb: FormBuilder,) {
    this.formulaire = this.fb.group({});
  }

  ngOnInit(): void {
    console.log("datas section", this.section)

    this._configInline = this.initConfigComponent("editorInline", true)
  }

  private initConfigComponent(nameControl: string, inline: boolean) {
    let config = {
      apiFile: (fileId) => {
        return `http://localhost:8080/api/file/${fileId ? fileId : ''}`
      },
      apiFileDownload: (fileId) => {
        return `http://localhost:8080/api/file/${fileId}?download=true`
      },
      apiKey: "fgijz3yzk7apwi527umteuey9tcto85mzsiz0m9k77avn70f",
      params: <InitWysiwyg>{
        height: 300,
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
