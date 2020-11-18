import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigInputBuilder, DataSourceType, FormBuilderService, InputComponents } from 'cocori-ng';

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
      .setViewContainerRef(this.formContainerRef)
      // .addInput('plat', 'Plat', InputComponents.INPUT_SELECT, { type: DataSourceType.BRUTE, value: [{ value: "hamburger", viewValue: "Hamburger Vegi" }, { value: "pizza", viewValue: "Pizza" }, { value: "quiche", viewValue: "Quiche" }] })
      .addInput('plat', new ConfigInputBuilder()
        .addOption('inputs', { nameLabel: 'Plat', dataSource: { type: DataSourceType.BRUTE, value: [{ value: "hamburger", viewValue: "Hamburger Vegi" }, { value: "pizza", viewValue: "Pizza" }, { value: "quiche", viewValue: "Quiche" }] } })
        .addOption('type', InputComponents.INPUT_SELECT))
      // .addInput('nom', 'Nom', InputComponents.INPUT_TEXT)
      .addInput('nom', new ConfigInputBuilder()
        .addOption('inputs', { nameLabel: 'Nom' })
        .addOption('type', InputComponents.INPUT_TEXT))
      // .addInput('prenom', 'Prénom', InputComponents.INPUT_TEXT, null, { callback: (control: string) => console.log('hello there : ', control) })
      .addInput('prenom', new ConfigInputBuilder()
        .addOption('inputs', { nameLabel: 'Prénom' })
        .addOption('type', InputComponents.INPUT_TEXT))
      // .addInput('zone', 'Zone', InputComponents.INPUT_TEXTAREA, null, { callback: this.onComponentReady })
      .addInput('zone', new ConfigInputBuilder()
        .addOption('inputs', { nameLabel: 'Zone' })
        .addOption('type', InputComponents.INPUT_TEXTAREA)
        .addOption('callbackComponent', { callback: this.onComponentReady }))
      .addButton('Valider', true, { callback: () => console.log("Bouton ajouté avec succès") })
      .addButton('Annuler', false, { callback: () => console.log("Bouton ajouté avec succès") })
      .form
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("values", value);

    this.jsonParsed = value;
  }
}
