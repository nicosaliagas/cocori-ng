import { InputTypes } from '../../shared/component/form';

export interface SchemaDatasForm {
    fields: SchemaFieldForm[];
}

export interface SchemaFieldForm {
    label: string;
    name: string;
    type: InputTypes;
}
