import { FormGroup } from '@angular/forms';

import { InputTypes, OutputCallback } from '../../shared/component/form';
import { DataSourceInput } from './data-source.model';
import { ButtonSchema, FormSchema } from './schema-datas.model';

export type ConfigComponentInputs = InputComponentInputs | ButtonComponentInputs | any

export type InputComponentInputsLight = Pick<InputComponentInputs, "nameLabel" | "dataSource" | "inRelationWith">;

export type NameControl = string

export interface ConfigInput {
    input?: InputComponentInputsLight,
    type?: InputTypes,
    callbackComponent?: OutputCallback
}

export interface InputComponentInputs {
    nameLabel: string,
    formGroup: FormGroup,
    nameControl: NameControl,
    dataSource?: DataSourceInput,
    inRelationWith?: NameControl
    // legend: {
    //    position: string,
    //    label: (x, y) => string
    // };
    // tooltip: (x, y) => string;
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
}