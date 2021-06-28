import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderService } from '@cocori-ng/lib';
import { ButtonIconPositon, DataSourceType, FormInputComponents, HttpService } from '@cocori-ng/lib/src/lib/feature-core';

@Component({
  selector: 'ct-static-form',
  templateUrl: './static-form.component.html',
  styleUrls: ['./static-form.component.scss'],
  providers: [FormBuilderService]
})
export class StaticFormComponent implements OnInit {
  @ViewChild('FormContainerRef1', { static: true, read: ViewContainerRef }) formContainerRef1: ViewContainerRef;
  @ViewChild('FormContainerRef2', { static: true, read: ViewContainerRef }) formContainerRef2: ViewContainerRef;
  @ViewChild('FormContainerRef3', { static: true, read: ViewContainerRef }) formContainerRef3: ViewContainerRef;

  formulaire: FormGroup;
  jsonParsed: any;

  constructor(
    private formBuilderService: FormBuilderService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  onComponentReady(control: string) {
    console.log(`Input : ${control} ajouté au form avec succès`)
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .appearance('fill') // par défaut c'est outline
      .setViewContainerRef(this.formContainerRef1)
      .addInput('brute', config => config
        .isRequired()
        .appearance('standard')
        .nameLabel('Datasource - brute')
        .icon('search')
        .typeInput(FormInputComponents.INPUT_SELECT)
        .dataSource({
          type: DataSourceType.BRUTE,
          dataSourceNameProperty: 'name',
          value: [{ id: "hamburger", name: "Hamburger Vegi" }, { id: "pizza", name: "Pizza" }, { id: "quiche", name: "Quiche" }]
        }))
      // .addInput('api', config => config
      //   .isRequired()
      //   .nameLabel('Datasource - API')
      //   .typeInput(InputComponents.INPUT_SELECT)
      //   .dataSource({
      //     type: DataSourceType.API,
      //     value: "https://localhost:5000/select-items/LastDegree/options"
      //   }))
      .addInput('nom', config => config
        .isRequired()
        .nameLabel('Nom')
        .icon('face')
        .appearance('standard')
        .typeInput(FormInputComponents.INPUT_TEXT)
        .maxlength(20)
        )
      .addInput('prenom', config => config
        .nameLabel('Prénom')
        .appearance('outline')
        .typeInput(FormInputComponents.INPUT_TEXT))
      .addInput('age', config => config
        .nameLabel('Age')
        .appearance('fill')
        .maxlength(2)
        .typeInput(FormInputComponents.INPUT_NUMBER))
        
      .setViewContainerRef(this.formContainerRef2)
      .addInput('email', config => config
        .nameLabel('Email')
        .icon('alternate_email')
        .appearance('standard')
        .typeInput(FormInputComponents.INPUT_EMAIL))
      .addInput('password', config => config
        .isRequired()
        .appearance('standard')
        .nameLabel('Mot de passe')
        .typeInput(FormInputComponents.INPUT_PASSWORD))
      .addInput('zone', config => config
        .isRequired()
        .nameLabel('Zone')
        .typeInput(FormInputComponents.INPUT_TEXTAREA)
        .outputCallback({ callback: this.onComponentReady }))
      .addInput('condition', config => config
        .nameLabel("J'ai lu et accepte les conditions")
        .typeInput(FormInputComponents.INPUT_CHECKBOX))
      .setViewContainerRef(this.formContainerRef3)
      .addButton('Valider', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))
      .addButton('Annuler', config => config
        .isTypeSubmit(false))
      .addButton('Je sors', config => config
        .icon('keyboard_arrow_right', ButtonIconPositon.END)
        .isTypeSubmit(false))
      .form
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("values", value);

    this.jsonParsed = value;
  }

  onClick() {
    this.httpService.get("https://localhost:5000/select-items/LastDegree/options").subscribe((values) => {
      console.log("call ", values)
    })
  }
}
