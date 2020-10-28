import { InputComponents } from '../../shared/component/form';

export interface PageSchema {
    forms: SchemaForm[],
    commandMappings: CommandMappings[];
}

export interface SchemaForm {
    name: string;
    fields: SchemaFields[];
}

export interface SchemaFields {
    label: string;
    name: string;
    type: InputComponents;
}

export interface CommandMappings {
    label: string;
    name: string;
    type: InputComponents;
}
