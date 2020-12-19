import { Component, Input, OnInit } from '@angular/core';

import { InputComponentInputs } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-textarea-ng',
    templateUrl: 'input-textarea.component.html',
})

export class InputTextareaComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: InputComponentInputs) {
        this.configInput(config)

        this.addControlForm();
    }

    constructor() {
        super();
    }

    ngOnInit() { }
}
