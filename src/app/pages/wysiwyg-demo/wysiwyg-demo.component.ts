import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigWysiwygModel, FormBuilderService, InitWysiwyg, ValidatorsService } from '@cocori-ng/lib';
import { EnvironmentService } from 'src/app/core/service/environment.service';

@Component({
  selector: 'wysiwyg-demo',
  templateUrl: './wysiwyg-demo.component.html',
  styleUrls: ['./wysiwyg-demo.component.scss']
})
export class WysiwygDemoComponent implements OnInit {
  @ViewChild('FormContainerRefButton', { static: true, read: ViewContainerRef }) formContainerRefButton: ViewContainerRef;

  _config: ConfigWysiwygModel;
  _configInline: ConfigWysiwygModel;

  formulaire: FormGroup

  constructor(
    private environmentService: EnvironmentService,
    private formBuilderService: FormBuilderService,) { }

  ngOnInit() {
    this.buildForm()
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
        return `${this.environmentService.appServerPath}/api/file/${fileId ? fileId : ''}`
      },
      apiFileDownload: (fileId) => {
        return `${this.environmentService.appServerPath}/api/file/${fileId}?download=true`
      },
      apiKey: this.environmentService.tinymceApiKey,
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
