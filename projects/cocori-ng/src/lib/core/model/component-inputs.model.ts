import { FormGroup } from '@angular/forms';

import { ButtonSchema, FormSchema } from './schema-datas.model';

export interface ComponentInputFormModel {
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