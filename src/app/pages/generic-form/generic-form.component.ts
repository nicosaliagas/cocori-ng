import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ConfigInputComponent,
  FormBuilderService,
  FormSchema,
  HttpService,
  InputComponents,
  SubmitDatas,
} from '@cocori-ng/lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ct-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
  providers: [FormBuilderService]
})
export class GenericFormComponent implements OnInit {
  interpretedForm: FormGroup;
  generatedForm: FormGroup;
  valuesInterpretedForm: SubmitDatas;
  jsonParsed: FormSchema | string;
  ready: boolean = false;
  inputComponentInputs: ConfigInputComponent;

  jsonParsed$: Observable<FormSchema | string>;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService) {

    this.interpretedForm = this.fb.group({});

    this.generatedForm = this.fb.group({
      formId: 'CCA49AB0-F823-4587-9A65-08977E80E341',
      fieldJsonText: null
    });

    this.inputComponentInputs = {
      type: InputComponents.INPUT_TEXTAREA,
      formGroup: this.generatedForm,
      nameLabel: "Contenu du JSON ici",
      nameControl: 'fieldJsonText',
      validators: []
    };
  }

  ngOnInit() { }

  private chargementConfiguration() {
    this.jsonParsed$ = this.httpService.get<FormSchema>(`/assets/ressources/schema-generic-frm-simple.json`)
      .pipe(
        map((configuration: FormSchema) => {
          this.generatedForm.get("fieldJsonText").setValue(JSON.stringify(configuration));

          return configuration;
        })
      )
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

  onSubmit(submitValues: SubmitDatas) {

    console.log("submitValues", submitValues)

    this.valuesInterpretedForm = submitValues;
  }
}
