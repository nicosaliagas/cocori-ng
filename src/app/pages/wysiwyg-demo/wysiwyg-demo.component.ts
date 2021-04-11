import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigWysiwygModel, FormBuilderService, InitWysiwyg, InputComponents, ValidatorsService } from 'cocori-ng';

@Component({
  selector: 'wysiwyg-demo',
  templateUrl: './wysiwyg-demo.component.html',
  styleUrls: ['./wysiwyg-demo.component.scss']
})
export class WysiwygDemoComponent implements OnInit {
  @ViewChild('FormContainerRefButton', { static: true, read: ViewContainerRef }) formContainerRefButton: ViewContainerRef;
  
  _config: ConfigWysiwygModel;

  formulaire: FormGroup

  constructor(private formBuilderService: FormBuilderService,) { }

  ngOnInit() {

    // this.formulaire = this.formBuilderService.newForm().form

    this.buildForm()

    this.initConfigComponent()
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .setViewContainerRef(this.formContainerRefButton)
      .addButton('Valider', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))
      .form
  }

  private initConfigComponent() {
    this._config = {
      apiFile: (fileId) => {
        return `http://localhost:8080/api/file/${fileId ? fileId : ''}`
      },
      apiFileDownload: (fileId) => {
        return `http://localhost:8080/api/file/${fileId}?download=true`
      },
      apiKey: "fgijz3yzk7apwi527umteuey9tcto85mzsiz0m9k77avn70f",
      params: <InitWysiwyg>{
        height: 300
      },
      nameLabel: '',
      type: InputComponents.INPUT_WYSIWYG,
      formGroup: this.formulaire,
      nameControl: "editorWysiwyg",
      validators: [ValidatorsService.require],
    }
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("values", value);
  }
}
