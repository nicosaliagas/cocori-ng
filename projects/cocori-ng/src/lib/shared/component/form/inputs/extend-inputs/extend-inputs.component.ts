import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { InputComponentInputs, NameControl } from '../../../../../core/model/component-inputs.model';
import { DataSourceInput } from '../../../../../core/model/data-source.model';

@Component({
    selector: 'extend-inputs-ng',
    template: '',
})

export abstract class ExtendInputsComponent {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    nameControl: NameControl;
    dataSource: any;
    inRelationWith: NameControl;
    validators: ValidatorFn[];

    constructor() { }

    configInput(config: InputComponentInputs) {
        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;

        this.dataSource = this.loadDataSource(config.dataSource)
        this.inRelationWith = config.inRelationWith
        this.validators = config.validators
    }

    emitEvent() {
        if (!this.formGroup || !this.nameControl) {
            throw new Error(`Données formulaire manquantes, formGroup : ${this.formGroup} - nameControl : ${this.nameControl}`);
        }

        this.inRelatioNWith()

        this.callback.emit(this.nameControl);
    }

    addControlForm() {
        this.formGroup.addControl(this.nameControl, new FormControl(null, this.validators))

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

    inRelatioNWith() {
        if (this.inRelationWith && typeof this.inRelationWith !== 'undefined') {

            console.log("inRelationWith>>", this.inRelationWith, this.formGroup)

            this.formGroup.get(this.inRelationWith).valueChanges.subscribe((parentValue) => {
                console.log("Parent Value ", parentValue);
            })
        }
    }
}
