export interface SchemaDatasForm {
    fields: SchemaFieldForm[];
}

export interface SchemaFieldForm {
    label: string;
    name: string;
    type: string;
}
