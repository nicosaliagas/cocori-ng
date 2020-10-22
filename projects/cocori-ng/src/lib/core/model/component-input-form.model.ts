import { FormGroup } from '@angular/forms';

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