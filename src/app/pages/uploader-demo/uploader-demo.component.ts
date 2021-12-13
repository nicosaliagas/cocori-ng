import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigUploaderModel, FormBuilderService, ValidatorsService } from 'cocori-ng';
import { DataSourceType, FormInputComponents } from 'cocori-ng/src/feature-core';
import * as faker from 'faker/locale/fr';
import { EnvironmentService } from 'src/app/core/service/environment.service';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

@Component({
  selector: 'uploader-demo',
  templateUrl: './uploader-demo.component.html',
  styleUrls: ['./uploader-demo.component.scss']
})
export class UploaderDemoComponent extends ExtendPageComponent implements OnInit {
  @ViewChild('FormContainerRef1', { static: true, read: ViewContainerRef }) formContainerRef1: ViewContainerRef;
  @ViewChild('FormContainerRefInputs', { static: true, read: ViewContainerRef }) formContainerRefInputs: ViewContainerRef;

  _config: ConfigUploaderModel;

  formulaire: FormGroup;

  constructor(
    public injector: Injector,
    private environmentService: EnvironmentService,
    private formBuilderService: FormBuilderService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Démo du composant upload` })

    this.buildForm()

    this.initConfigUploader()
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .setViewContainerRef(this.formContainerRefInputs)
      .addInput('nom', config => config
        .isRequired()
        .nameLabel('Nom')
        .icon('face')
        .appearance('standard')
        .typeInput(FormInputComponents.INPUT_TEXT)
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
      type: FormInputComponents.INPUT_UPLOADER,
      formGroup: this.formulaire,
      nameControl: "files",
      validators: [ValidatorsService.require],
      nameLabel: "Veuillez joindre les pièces justificatives au dossier",
      apiFile: (fileId) => {
        return `${this.environmentService.appServerPath}/api/upload/file/${fileId ? fileId : ''}`
      },
      apiFileDownload: (fileId) => {
        return `${this.environmentService.appServerPath}/api/upload/file/${fileId}?download=true`
      },
      dataSource: {
        type: DataSourceType.BRUTE, value: [
          {
            id: 'E1C57AD5-6921-44CE-8F0E-7230CE576205',
            description: 'Votre rapport',
            fileName: 'Rapport.pdf',
            dateUpload: faker.date.recent(),
            size: 182.23,
            mimeType: 'application/pdf'
          },
          {
            id: '3CE8B88D-E32F-4BAF-AABB-E70866687340',
            dateUpload: faker.date.recent(),
            description: 'Recto / verso de votre CNI',
            fileName: 'CarteIdentite.png',
            size: 82.12,
            mimeType: 'image/jpeg'
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

    console.log("values>>", value);
  }
}
