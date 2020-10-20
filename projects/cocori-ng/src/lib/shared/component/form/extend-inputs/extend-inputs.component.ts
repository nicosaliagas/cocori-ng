import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputModel } from '../../../../core/model/field-form.model';

@Component({
    selector: 'extend-inputs-ng',
    template: '',
})

export abstract class ExtendInputsComponent {
    @Output() onComponentReady: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    nameControl: string;

    @Input()
    set config(config: InputModel) {
        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;
    }

    constructor() { }

    init() {
        if (!this.formGroup || !this.nameControl) {
            throw new Error(`Données formulaire manquantes, formGroup : ${this.formGroup} - nameControl : ${this.nameControl}`);
        }

        this.onComponentReady.emit(this.nameControl);
    }

    // abstract initialise(): void;
}
