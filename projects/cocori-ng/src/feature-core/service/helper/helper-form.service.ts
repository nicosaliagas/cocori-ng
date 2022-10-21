import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormHelperService {

    countControlsForm(form: UntypedFormGroup): number {
        return Object.keys(form.controls).length
    }

    keysControlsForm(form: UntypedFormGroup): string[] {
        return Object.keys(form.controls)
    }
}
