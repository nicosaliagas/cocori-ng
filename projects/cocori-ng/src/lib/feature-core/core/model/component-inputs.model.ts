import { FormGroup, ValidatorFn } from '@angular/forms';

import { DataSourceInput } from './data-source.model';
import { FormInputComponents } from './form-input-components.model';
import { ButtonSchema, FormSchema } from './schema-datas.model';

export type OutputCallback = {
    callback?: Function
    click?: Function
}

export type ConfigComponentInputs = ConfigInputComponent | ButtonComponentInputs | any

export type InputFieldAppearance = 'standard' | 'fill' | 'outline';

export interface ConfigInputComponent {
    nameLabel: string,
    formGroup: FormGroup,
    nameControl: string,
    type?: FormInputComponents,
    validators?: ValidatorFn[];
    icon?: string,
    styleCompact?: boolean,
    maxlength?: number,
    dataSource?: DataSourceInput,
    inRelationWith?: string
    appearance?: InputFieldAppearance
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
    icon?: string,
    className?: string,
    iconPosition?: ButtonIconPositon
}

export enum ButtonIconPositon {
    START = 'start',
    END = 'end',
}