import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenerateFormService, HttpService, InjectComponentService, InputModel } from 'cocori-ng';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'ct-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GenerateFormService]
})
export class HomeComponent implements OnInit {
  // @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  interpretedForm: FormGroup;
  generatedForm: FormGroup;
  valuesInterpretedForm: any;
  jsonParsed: any;
  ready: boolean = false;
  configGeneratedForm: InputModel;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private generateFormService: GenerateFormService,
    private injectComponentService: InjectComponentService) {

    this.interpretedForm = fb.group({});

    this.generatedForm = fb.group({
      fieldJsonText: null
    });

    this.configGeneratedForm = { formGroup: this.generatedForm, nameLabel: "Contenu du JSON ici", nameControl: 'fieldJsonText' };
  }

  ngOnInit() { }

  chargementConfiguration() {
    this.httpService.httpGet(`/assets/ressources/config-frm-abrege.json`)
      .pipe(
        map((configuration: any) => {
          this.jsonParsed = configuration;
          this.generatedForm.get("fieldJsonText").setValue(JSON.stringify(configuration));
        })
      ).subscribe();
  }

  public addChild(nameControl: string) {
    console.log("confirmation champ ajouté !", nameControl);

    this.chargementConfiguration();
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    try {
      this.ready = true;
      this.jsonParsed = JSON.parse(value.fieldJsonText);
    } catch (e) {
      this.ready = false;

      this.jsonParsed = `oops JSON.parse a généré une erreur... ${e}`;
      return ;
    }
  }

  formulaireInitialise(check: boolean) {
    console.log("le formulaire est initialisé avec succès", check);
  }
}
