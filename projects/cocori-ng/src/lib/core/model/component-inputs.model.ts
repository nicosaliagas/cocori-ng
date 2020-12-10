import { FormGroup, ValidatorFn } from '@angular/forms';

import { DataSourceInput } from './data-source.model';
import { ButtonSchema, FormSchema } from './schema-datas.model';

export type ConfigComponentInputs = InputComponentInputs | ButtonComponentInputs | any

export type NameControl = string

export interface InputComponentInputs {
    nameLabel: string,
    formGroup: FormGroup,
    nameControl: NameControl,
    validators: ValidatorFn[];
    dataSource?: DataSourceInput,
    inRelationWith?: NameControl
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