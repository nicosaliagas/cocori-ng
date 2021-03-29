import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { configdefault } from '../../../config/config.components';
import { InputComponents } from '../../../shared/component/form';
import { ConfigInputComponent } from '../../model/component-inputs.model';
import { FormBuilderService } from './form-builder.service';

describe('FormBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      schemas: []
    });
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a new form', () => {
    expect(Object.keys(service.form.controls).length).toEqual(1)

    expect(Object.keys(service.configInputsForm).length).toEqual(0)

    expect(service.form.get(configdefault.form.keyId)).toBeTruthy()

    expect(service.form.get(configdefault.form.keyId).value).not.toBeNull()

    expect(service.form.get(configdefault.form.keyId).value).toEqual(service.formId)
  });

  it('should create a new form', () => {
    service
      .addInput('control1', config => config
        .typeInput(InputComponents.INPUT_TEXT))
      .addInput('control2', config => config
        .typeInput(InputComponents.INPUT_TEXT))

    expect(Object.keys(service.form.controls).length).toEqual(1)

    expect(Object.keys(service.configInputsForm).length).toEqual(2)

    const firstConfig: ConfigInputComponent = service.configInputsForm[0]

    expect(firstConfig).toEqual(<ConfigInputComponent>{
      type: InputComponents.INPUT_TEXT,
      nameControl: 'control1',
      appearance: service.getAppearance(),
      styleCompact: service.styleCompact
    })

  });
});
