import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormInputComponents, ModalOptionsModel } from 'cocori-ng/src/feature-core';
import { ConfirmModalService, FormBuilderService } from 'cocori-ng/src/feature-form';
import { takeUntil } from 'rxjs';
import { ExtendPageComponent } from 'src/app/shared/component/extend-page/extend-page.component';

export interface EmailModalModel {
  email: string,
}

@Component({
  selector: 'modal-page-ng',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent extends ExtendPageComponent implements OnInit {
  @ViewChild('ModalFormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

  optionsModalFormulaire: ModalOptionsModel = {
    withForm: true,
    title: "Mot de passe oublié",
    message: 'Vous recevrez la procédure de renouvellement de votre mot de passe par email :',
    cancelText: 'Annuler',
    confirmText: 'Valider'
  };

  optionsModalConfirmation: ModalOptionsModel = {
    withForm: false,
    title: "Information",
    message: 'Simple information test, <b>happy</b> <a target="_blank" href="http://www.google.fr">Google</a> ?',
    cancelText: "LEAVE ME ALONE",
    confirmText: 'OK, COOL'
  };

  constructor(
    public injector: Injector,
    private dialogService: ConfirmModalService,
    private formBuilderService: FormBuilderService) {
    super(injector)

    this.formBuilderService.newForm()
  }

  ngOnInit(): void {
    this.setAppbarInfos({ barTitle: `Intégration de différents type de modal` })

    this.buildForm()
  }

  openModalConfirmation() {
    this.dialogService.open(this.optionsModalConfirmation);

    this.dialogService.confirmed<boolean>().pipe(
      takeUntil(this.destroy$)
    ).subscribe(retourModal => {
      console.log("Fermeture de la modal avec en retour : ", retourModal)
    })
  }

  openModalForm() {
    this.dialogService.open(this.optionsModalFormulaire);

    this.dialogService.confirmed<EmailModalModel>().pipe(
      takeUntil(this.destroy$)
    ).subscribe(retourModal => {
      console.log("Fermeture de la modal avec en retour : ", retourModal)
    })
  }

  private buildForm() {
    this.formBuilderService
      .addInput('email', config => config
        .nameLabel('Email')
        .isRequired()
        .typeInput(FormInputComponents.INPUT_EMAIL))
      .configInputsForm
  }
}
