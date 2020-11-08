import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderService, InputComponents } from 'cocori-ng';

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
      .addInput('nom', 'Nom', InputComponents.INPUT_TEXT)
      .addInput('prenom', 'Prénom', InputComponents.INPUT_TEXT, { callback: (control: string) => console.log('hello there : ', control) })
      .addInput('zone', 'Zone', InputComponents.INPUT_TEXTAREA, { callback: this.onComponentReady })
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
