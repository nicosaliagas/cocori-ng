import { DataSourceInput } from './data-source.model';
import { FormInputComponents } from './form-input-components.model';

export interface Schema {
    page: any,
}

/** Form */

export interface PageSchema {
    forms: FormSchema[],
    buttons: ButtonSchema[],
}

export interface FormSchema {
    id: string;
    name: string;
    fields: FieldSchema[];
}

export interface FieldSchema {
    label: string;
    name: string;
    type: FormInputComponents;
    dataSource: DataSourceInput;
    inRelationWith: string;
}
/** / Form */

/** Buttons */

export interface ButtonSchema {
    text: string;
    name: string;
    formName: string;
    command: string;
    redirectTo: string;
    submit: boolean;
    commandMappings: CommandMappings[];
}

export interface CommandMappings {
    source: string;
    destination: string;
}

/** / Buttons */
