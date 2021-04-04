import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigUploaderModel, DataSourceType, FormBuilderService, InputComponents, ValidatorsService } from 'cocori-ng';

@Component({
  selector: 'uploader-demo',
  templateUrl: './uploader-demo.component.html',
  styleUrls: ['./uploader-demo.component.scss']
})
export class UploaderDemoComponent implements OnInit {
  @ViewChild('FormContainerRef1', { static: true, read: ViewContainerRef }) formContainerRef1: ViewContainerRef;
  @ViewChild('FormContainerRefInputs', { static: true, read: ViewContainerRef }) formContainerRefInputs: ViewContainerRef;

  _config: ConfigUploaderModel;

  formulaire: FormGroup;

  constructor(private formBuilderService: FormBuilderService,) { }

  ngOnInit() {
    this.buildForm()

    this.initConfigUploader()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .setViewContainerRef(this.formContainerRefInputs)
      .addInput('nom', config => config
        .isRequired()
        .nameLabel('Nom')
        .icon('face')
        .appearance('standard')
        .typeInput(InputComponents.INPUT_TEXT)
        .maxlength(20)
      )
      .setViewContainerRef(this.formContainerRef1)
      .addButton('Valider', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))
      .form
  }

  private initConfigUploader() {
    this._config = {
      type: InputComponents.INPUT_UPLOADER,
      formGroup: this.formulaire,
      nameControl: "files",
      validators: [ValidatorsService.require],
      nameLabel: "Veuillez joindre les pièces justificatives au dossier",
      apiFile: (fileId) => {
        return `http://localhost:8080/api/file/${fileId ? fileId : ''}`
      },
      apiFileDownload: (fileId) => {
        return `http://localhost:8080/api/file/${fileId}?download=true`
      },
      dataSource: {
        type: DataSourceType.BRUTE, value: [
          {
            id: 'E1C57AD5-6921-44CE-8F0E-7230CE576205',
            description: 'Votre rapport',
            fileName: 'Rapport.pdf',
            size: 182.23,
            fileType: 'doc'
          },
          {
            id: '3CE8B88D-E32F-4BAF-AABB-E70866687340',
            description: 'Recto / verso de votre CNI',
            fileName: 'CarteIdentite.png',
            size: 82.12,
            fileType: 'image'
          },
          {
            description: 'Votre passeport',
          },
          {
            description: 'Un justificatif de domicile',
          }
        ]
      },
    }
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("values", value);
  }
}
