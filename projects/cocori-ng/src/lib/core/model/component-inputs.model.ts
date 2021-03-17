import { FormGroup, ValidatorFn } from '@angular/forms';

import { InputComponents, OutputCallback } from '../../shared/component/form';
import { DataSourceInput } from './data-source.model';
import { ButtonSchema, FormSchema } from './schema-datas.model';

export type ConfigComponentInputs = ConfigInputComponent | ButtonComponentInputs | any

export type InputFieldAppearance = 'standard' | 'fill' | 'outline';

export type NameControl = string

export interface ConfigInputComponent {
    type: InputComponents,
    nameLabel: string,
    formGroup: FormGroup,
    nameControl: NameControl,
    validators: ValidatorFn[];
    icon?: string,
    styleCompact?: boolean,
    maxlength?: number,
    dataSource?: DataSourceInput,
    inRelationWith?: NameControl
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
    iconPosition?: ButtonIconPositon
}

// export type ButtonIconPositon = 'start' | 'end';

export enum ButtonIconPositon {
    START = 'start',
    END = 'end',
}