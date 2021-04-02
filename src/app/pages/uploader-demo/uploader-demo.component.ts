import { Component, OnInit } from '@angular/core';
import { ConfigUploaderModel, DataSourceType } from 'cocori-ng';

@Component({
  selector: 'uploader-demo',
  templateUrl: './uploader-demo.component.html',
  styleUrls: ['./uploader-demo.component.scss']
})
export class UploaderDemoComponent implements OnInit {
  _config: ConfigUploaderModel;

  constructor() { }

  ngOnInit() {
    this.initConfigUploader()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private initConfigUploader() {
    this._config = {
      label: "Veuillez joindre les pièces justificatives au dossier",
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
}
