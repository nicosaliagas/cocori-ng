import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigInputBuilder, DataSourceType, FormBuilderService, InputComponents } from 'cocori-ng';

@Component({
  selector: 'ct-static-inputs-chained',
  templateUrl: './static-inputs-chained.component.html',
  styleUrls: ['./static-inputs-chained.component.scss'],
  providers: [FormBuilderService]
})
export class StaticInputsChainedComponent implements OnInit {
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
      .addInput('regimes', new ConfigInputBuilder()
        .addOption('input', { nameLabel: 'Régime alimentaire', dataSource: { type: DataSourceType.BRUTE, value: [{ value: "vegi", viewValue: "Végétarien" }, { value: "vegetalien", viewValue: "Végétalien" }, { value: "aucun", viewValue: "Aucun" }] } })
        .addOption('type', InputComponents.INPUT_SELECT))
      .addInput('plat', new ConfigInputBuilder()
        .addOption('input',
          {
            nameLabel: 'Plat',
            inRelationWith: "regimes",
            dataSource: { type: DataSourceType.BRUTE, value: [{ value: "hamburger", viewValue: "Hamburger Vegi" }, { value: "pizza", viewValue: "Pizza bacon" }, { value: "quiche", viewValue: "Quiche aux herbes" }] }
          })
        .addOption('type', InputComponents.INPUT_SELECT))
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
