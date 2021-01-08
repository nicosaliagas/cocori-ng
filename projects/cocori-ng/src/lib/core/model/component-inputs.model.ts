import { FormGroup, ValidatorFn } from '@angular/forms';

import { InputComponents, OutputCallback } from '../../shared/component/form';
import { DataSourceInput } from './data-source.model';
import { ButtonSchema, FormSchema } from './schema-datas.model';

export type ConfigComponentInputs = ConfigInputComponent | ButtonComponentInputs | any

export type NameControl = string

export interface ConfigInputComponent {
    type: InputComponents,
    nameLabel: string,
    formGroup: FormGroup,
    nameControl: NameControl,
    validators: ValidatorFn[];
    styleCompact?: boolean,
    dataSource?: DataSourceInput,
    inRelationWith?: NameControl
    callbackComponent?: OutputCallback
}

export interface FormContainerInputs {
    form: FormSchema,
    buttons: ButtonSchema[],
}

export enum TypeButtonEnum {
    SUBMIT = 'submit',
    BUTTON = 'button',
}

export interface ButtonComponentInputs {
    text: string,
    type: TypeButtonEnum,
    onClickSubmit: Function,
}