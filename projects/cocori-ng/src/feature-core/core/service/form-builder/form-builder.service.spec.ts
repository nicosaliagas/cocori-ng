import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultConfigComponent, FormInputComponents } from '@cocori-ng/lib/src/lib/feature-core';

import { ConfigInputComponent } from '../../model/component-inputs.model';
import { FormBuilderService } from './form-builder.service';

describe('FormBuilderService', () => {
  let formBuilderService: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      schemas: []
    });

    formBuilderService = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(formBuilderService).toBeTruthy();
  });

  it('should initialize a new form', () => {
    expect(Object.keys(formBuilderService.form.controls).length).toEqual(1)

    expect(Object.keys(formBuilderService.configInputsForm).length).toEqual(0)

    expect(formBuilderService.form.get(DefaultConfigComponent.form.keyId)).toBeTruthy()

    expect(formBuilderService.form.get(DefaultConfigComponent.form.keyId).value).not.toBeNull()

    expect(formBuilderService.form.get(DefaultConfigComponent.form.keyId).value).toEqual(formBuilderService.formId)
  });

  it('should create a new form', () => {
    formBuilderService
      .addInput('control1', config => config
        .isRequired()
        .typeInput(FormInputComponents.INPUT_TEXT)
        .nameLabel('label control1'))
      .addInput('control2', config => config
        .typeInput(FormInputComponents.INPUT_TEXT))


    expect(Object.keys(formBuilderService.form.controls).length).toEqual(1)
    expect(Object.keys(formBuilderService.configInputsForm).length).toEqual(2)

    const firstConfig: ConfigInputComponent = formBuilderService.configInputsForm[0]

    expect(firstConfig.nameControl).toEqual('control1')
    expect(firstConfig.type).toEqual(FormInputComponents.INPUT_TEXT)
    expect(firstConfig.nameLabel).toEqual('label control1')

    expect(firstConfig.validators.length).toEqual(1)
    expect(firstConfig.validators[0].name).toEqual('require')
  });

  it('should generate a component', () => {
    spyOn(formBuilderService.generateComponentViewService, 'addComponentToView')

    formBuilderService
      .addInput('control1', config => config
        .isRequired()
        .typeInput(FormInputComponents.INPUT_TEXT)
        .nameLabel('label control1'))
      .addInput('control2', config => config
        .typeInput(FormInputComponents.INPUT_TEXT))
      .addButton('Valider', config => config
        .isTypeSubmit()
        .icon('check')
        .outputCallback({ callback: () => console.log("Bouton ajouté avec succès") }))

    expect(formBuilderService.generateComponentViewService.addComponentToView).toHaveBeenCalledTimes(3)
  });

  ///// generateFormInView()
});
