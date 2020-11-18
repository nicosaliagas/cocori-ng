import { FormGroup } from '@angular/forms';

import { InputTypes, OutputCallback } from '../../shared/component/form';
import { DataSourceInput } from './data-source.model';
import { ButtonSchema, FormSchema } from './schema-datas.model';

export type ConfigComponentInputs = InputComponentInputs | ButtonComponentInputs | any

type InputComponentInputsLight = Pick<InputComponentInputs, "nameLabel" | "dataSource">;

export interface ConfigInput {
    inputs?: InputComponentInputsLight,
    type?: InputTypes,
    callbackComponent?: OutputCallback
}

export interface InputComponentInputs {
    nameLabel: string,
    formGroup: FormGroup,
    nameControl: string,
    dataSource?: DataSourceInput,
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