import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DataSourceType, FormInputComponents } from 'cocori-ng/src/feature-core';
import { FormBuilderService } from 'cocori-ng/src/feature-form';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

@Component({
  selector: 'ct-static-inputs-chained',
  templateUrl: './static-inputs-chained.component.html',
  styleUrls: ['./static-inputs-chained.component.scss'],
  providers: [FormBuilderService]
})
export class StaticInputsChainedComponent extends ExtendPageComponent implements OnInit {
  @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  formulaire: UntypedFormGroup;
  jsonParsed: any;

  constructor(
    public injector: Injector,
    private formBuilderService: FormBuilderService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Champs inputs chaînés dans un formulaire` })

    this.buildForm()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .setViewContainerRef(this.formContainerRef)
      .addInput('regimes', config => config
        .nameLabel('Régime alimentaire')
        .typeInput(FormInputComponents.INPUT_SELECT)
        .dataSource({
          type: DataSourceType.BRUTE,
          value: [{ id: "vegi", name: "Végétarien" }, { id: "vegetalien", name: "Végétalien" }, { id: "aucun", name: "Aucun" }]
        }))
      .addInput('plat', config => config
        .nameLabel('Plat')
        .typeInput(FormInputComponents.INPUT_SELECT)
        .inRelationWith('regimes')
        .dataSource({
          type: DataSourceType.BRUTE,
          value: [{ id: "hamburger", name: "Hamburger Vegi" }, { id: "pizza", name: "Pizza bacon" }, { id: "quiche", name: "Quiche aux herbes" }]
        }))
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
