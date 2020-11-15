import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DataSourceInput, InputComponentInputs } from '../../../../core/model/component-inputs.model';

@Component({
    selector: 'extend-inputs-ng',
    template: '',
})

export abstract class ExtendInputsComponent {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    nameControl: string;
    dataSource: any;

    constructor() { }

    configInput(config: InputComponentInputs) {

        console.log("config", config)

        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;

        this.dataSource = this.loadDataSource(config.dataSource)
    }

    emitEvent() {
        if (!this.formGroup || !this.nameControl) {
            throw new Error(`Données formulaire manquantes, formGroup : ${this.formGroup} - nameControl : ${this.nameControl}`);
        }

        this.callback.emit(this.nameControl);
    }

    addDefaultForm() {
        this.formGroup.addControl(this.nameControl, new FormControl())

        this.emitEvent()
    }

    loadDataSource(configDataSource: DataSourceInput) {
        console.log(configDataSource)
        if (configDataSource) {
            return [
                { value: 'steak-0', viewValue: 'Steak' },
                { value: 'pizza-1', viewValue: 'Pizza' },
                { value: 'tacos-2', viewValue: 'Tacos' }
            ]
        } else {
            return null
        }
    }
}
