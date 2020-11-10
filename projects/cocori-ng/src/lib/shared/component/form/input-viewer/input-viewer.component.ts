import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputComponentInputs } from '../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-viewer-ng',
    templateUrl: 'input-viewer.component.html',
})

export class InputViewerComponent extends ExtendInputsComponent implements OnInit {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    nameControl: string;

    @Input()
    set config(config: InputComponentInputs) {
        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;

        this.addForm()
    }

    constructor(private fb: FormBuilder,) {
        super();
    }

    ngOnInit() {
    }

    addForm() {
        const nestedFrom: FormGroup = this.fb.group({
            windowingMin: null,
            windowingMax: null,
            rangeMin: null,
            rangeMax: null,
            lut: null
        })

        this.formGroup.addControl(this.nameControl, nestedFrom)

        this.emitEvent()
    }
}
