import { FormGroup } from '@angular/forms';

import { ButtonSchema, FormSchema } from './schema-datas.model';

export interface InputComponentInputs {
    nameLabel: string;
    formGroup: FormGroup;
    nameControl: string;
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