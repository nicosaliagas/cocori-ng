import { InputComponents } from '../../shared/component/form';

export interface PageSchema {
    forms: SchemaForm[],
}

export interface SchemaForm {
    name: string;
    fields: SchemaFields[];
    buttons: SchemaButtons[];
}

export interface SchemaFields {
    label: string;
    name: string;
    type: InputComponents;
}

/** Buttons */

export interface SchemaButtons {
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
