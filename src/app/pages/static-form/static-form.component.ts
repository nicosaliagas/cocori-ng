import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilderService, InputComponents } from 'cocori-ng';

@Component({
  selector: 'ct-static-form',
  templateUrl: './static-form.component.html',
  styleUrls: ['./static-form.component.scss'],
  providers: [FormBuilderService]
})
export class StaticFormComponent implements OnInit {
  @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  constructor(
    private formBuilderService: FormBuilderService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onComponentReady(check: boolean) {
    console.log("Input ajouté au form avec succès : ", check);
  }

  private buildForm() {
    this.formBuilderService
      .setViewContainerRef(this.formContainerRef)
      .onInputReady(this.onComponentReady)
      .addInput('nom', 'Nom', InputComponents.INPUT_TEXT)
      .addInput('prenom', 'Prénom', InputComponents.INPUT_TEXT)
      .addInput('test', 'Zone', InputComponents.INPUT_TEXTAREA)
      ;
  }
}
