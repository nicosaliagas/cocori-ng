import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataSourceType, FormBuilderService, InputComponents } from 'cocori-ng';

@Component({
  selector: 'ct-static-form',
  templateUrl: './static-form.component.html',
  styleUrls: ['./static-form.component.scss'],
  providers: [FormBuilderService]
})
export class StaticFormComponent implements OnInit {
  @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  formulaire: FormGroup;
  jsonParsed: any;

  constructor(
    private formBuilderService: FormBuilderService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .identityForm("0C8ADB54-B801-49E2-BF06-1B1C44470BF7", "Form Static")
      .setViewContainerRef(this.formContainerRef)
      .addInput('plat', config => config
        .isRequired()
        .nameLabel('Plat')
        .typeInput(InputComponents.INPUT_SELECT)
        .dataSource({
          type: DataSourceType.BRUTE,
          value: [{ value: "hamburger", viewValue: "Hamburger Vegi" }, { value: "pizza", viewValue: "Pizza" }, { value: "quiche", viewValue: "Quiche" }]
        }))
      .addInput('nom', config => config
        .isRequired()
        .nameLabel('Nom')
        .typeInput(InputComponents.INPUT_TEXT))
      .addInput('prenom', config => config
        .nameLabel('Prénom')
        .typeInput(InputComponents.INPUT_TEXT))
      .addInput('password', config => config
        .isRequired()
        .nameLabel('Mot de passe')
        .typeInput(InputComponents.INPUT_PASSWORD))
      .addInput('zone', config => config
        .isRequired()
        .nameLabel('Zone')
        .typeInput(InputComponents.INPUT_TEXTAREA)
        .outputCallback({ callback: this.onComponentReady }))
      .addButton('Valider', config => config
        .isTypeSubmit()
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))
      .addButton('Annuler', config => config
        .isTypeSubmit(false))
      .form
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("values", value);

    this.jsonParsed = value;
  }
}
