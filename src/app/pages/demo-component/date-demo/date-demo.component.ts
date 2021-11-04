import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderService } from '@cocori-ng/lib';
import { FormInputComponents } from '@cocori-ng/lib/src/lib/feature-core';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

@Component({
  selector: 'date-demo',
  templateUrl: './date-demo.component.html',
  styleUrls: ['./date-demo.component.scss']
})
export class DateDemoComponent extends ExtendPageComponent implements OnInit {
  @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  formulaire: FormGroup;

  constructor(
    public injector: Injector,
    private formBuilderService: FormBuilderService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setAppbarInfos({ barTitle: `Démo du composant date` })

    this.buildForm()
  }

  private buildForm() {
    this.formulaire = this.formBuilderService
      .appearance('fill') // par défaut c'est outline
      .setViewContainerRef(this.formContainerRef)
      .addInput('date', config => config
        .nameLabel('Date de naissance')
        .isRequired()
        .typeInput(FormInputComponents.INPUT_DATE))
      .addInput('date3', config => config
        .nameLabel('Date de naissance')
        .isRequired()
        .typeInput(FormInputComponents.INPUT_DATE))
      .addInput('date2', config => config
        .nameLabel('Date de décés')
        .typeInput(FormInputComponents.INPUT_DATE))
      .addButton('Valider', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))
      .form

      this.formulaire.get('date').setValue(new Date())
  }

  validateFrom({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) return;

    console.log("value >>> ", value)
  }
}