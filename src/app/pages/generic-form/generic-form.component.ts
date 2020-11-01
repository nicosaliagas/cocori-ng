import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentInputFormModel, FormBuilderService, FormSchema, HttpService } from 'cocori-ng';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'ct-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
  providers: [FormBuilderService]
})
export class GenericFormComponent implements OnInit {
  interpretedForm: FormGroup;
  generatedForm: FormGroup;
  valuesInterpretedForm: any;
  jsonParsed: FormSchema | string;
  ready: boolean = false;
  componentInputConfig: ComponentInputFormModel;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService) {

    this.interpretedForm = this.fb.group({});

    this.generatedForm = this.fb.group({
      fieldJsonText: null
    });

    this.componentInputConfig = { formGroup: this.generatedForm, nameLabel: "Contenu du JSON ici", nameControl: 'fieldJsonText' };
  }

  ngOnInit() { }

  chargementConfiguration() {
    this.httpService.httpGet<FormSchema>(`/assets/ressources/schema-generic-frm-simple.json`)
      .pipe(
        map((configuration: FormSchema) => {
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
    console.log("le formulaire a été généré avec succès :)");
  }

  onSubmit(values: any) {
    this.valuesInterpretedForm = values;
  }
}
