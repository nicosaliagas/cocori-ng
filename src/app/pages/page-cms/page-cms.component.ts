import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigWysiwygModel, FormBuilderService, InitWysiwyg, ValidatorsService } from '@cocori-ng/lib';
import { CMSService } from '@cocori-ng/lib/src/lib/feature-cms';
import { FormService } from '@cocori-ng/lib/src/lib/feature-form';

@Component({
  selector: 'page-cms',
  templateUrl: './page-cms.component.html',
  styleUrls: ['./page-cms.component.scss']
})
export class PageCMSComponent implements OnInit {
  @ViewChild('FormContainerRefButton', { static: true, read: ViewContainerRef }) formContainerRefButton: ViewContainerRef;

  _config: ConfigWysiwygModel;
  _configInline: ConfigWysiwygModel;

  formulaire: FormGroup

  constructor(private formService: FormService, private cmsService: CMSService, private formBuilderService: FormBuilderService,) { }

  ngOnInit() {
    this.buildForm()

    console.log(">>>>>>>>>>>>>>>>>", this.cmsService.name)

  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .setViewContainerRef(this.formContainerRefButton)
      .addButton('Valider', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))
      .form

    this._config = this.initConfigComponent("editor", false, true)

    this._configInline = this.initConfigComponent("editorInline", true, false)
  }

  private initConfigComponent(nameControl: string, inline: boolean, require: boolean) {
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

    if (require) {
      config.validators.push(ValidatorsService.require)
    }

    return config
  }

  callback(controlName: string) {
    switch (controlName) {
      case 'editor':
        this.formulaire.get(controlName).setValue("<p>Hello World !!</p>")

        break;

      case 'editorInline':
        this.formulaire.get(controlName).setValue("<p>Vous pouvez m'éditer : 🤡</p>")

        break;

      default:
        break;
    }
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("values", value);
  }
}
