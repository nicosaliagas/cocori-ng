import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { InputComponentInputs } from '../../../../core/model/component-inputs.model';

@Component({
    selector: 'extend-inputs-ng',
    template: '',
})

export abstract class ExtendInputsComponent {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    nameControl: string;

    @Input()
    set config(config: InputComponentInputs) {
        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;

        this.addBasicForm();
    }

    constructor() { }

    emitEvent() {
        if (!this.formGroup || !this.nameControl) {
            throw new Error(`Données formulaire manquantes, formGroup : ${this.formGroup} - nameControl : ${this.nameControl}`);
        }

        this.callback.emit(this.nameControl);
    }

    addBasicForm() {
        this.formGroup.addControl(this.nameControl, new FormControl())

        this.emitEvent()
    }
}
