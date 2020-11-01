import { InputComponents } from '../../shared/component/form';

export interface Schema {
    page: any,
}

/** Form */

export interface PageSchema {
    forms: FormSchema[],
    buttons: ButtonSchema[],
}

export interface FormSchema {
    name: string;
    fields: FieldSchema[];
}

export interface FieldSchema {
    label: string;
    name: string;
    type: InputComponents;
}
/** / Form */

/** Buttons */

export interface ButtonSchema {
    name: string;
    submitForm: string;
    command: string;
    redirectTo: string;
    commandMappings: CommandMappings[];
}

export interface CommandMappings {
    source: string;
    destination: string;
}

/** / Buttons */
