import { InputComponents } from '../../shared/component/form';
import { NameControl } from './component-inputs.model';
import { DataSourceInput } from './data-source.model';

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
    name: NameControl;
    type: InputComponents;
    dataSource: DataSourceInput;
    inRelationWith: NameControl;
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
