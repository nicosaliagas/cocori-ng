import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormHelperService {

    countControlsForm(form: FormGroup): number {
        return Object.keys(form.controls).length
    }

    keysControlsForm(form: FormGroup): string[] {
        return Object.keys(form.controls)
    }
}
