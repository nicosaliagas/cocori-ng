import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { InputComponentInputs } from '../../../../core/model/component-inputs.model';
import { DataSourceInput } from '../../../../core/model/data-source.model';

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

        /** todo: prendre en compte le type de la datasource */

        if (configDataSource) {
            return configDataSource.value
        } else {
            return null
        }
    }
}
