import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentInputFormModel, FormBuilderService, HttpService } from 'cocori-ng';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'ct-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
  providers: [FormBuilderService]
})
export class GenericPageComponent implements OnInit {
  interpretedForm: FormGroup;
  generatedForm: FormGroup;
  valuesInterpretedForm: any;
  jsonParsed: any;
  ready: boolean = false;
  componentInputConfig: ComponentInputFormModel;

  constructor(
    private fb: FormBuilder,
    private formBuilderService: FormBuilderService,
    private httpService: HttpService) {

    this.interpretedForm = this.fb.group({});

    this.generatedForm = this.fb.group({
      fieldJsonText: null
    });

    this.componentInputConfig = { formGroup: this.generatedForm, nameLabel: "Contenu du JSON ici", nameControl: 'fieldJsonText' };
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
      this.jsonParsed = JSON.parse(value.fieldJsonText);

      this.ready = true;
    } catch (e) {
      this.ready = false;

      this.jsonParsed = `oops JSON.parse a généré une erreur... ${e}`;
      return;
    }
  }

  onComponentReady(check: boolean) {
    console.log("le formulaire est initialisé avec succès", check);
  }

  onSubmit(values: any) {
    this.valuesInterpretedForm = values;
  }
}
