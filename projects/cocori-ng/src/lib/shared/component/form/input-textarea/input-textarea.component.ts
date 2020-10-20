import { Component, OnInit } from '@angular/core';

import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-textarea-ng',
    templateUrl: 'input-textarea.component.html',
})

export class InputTextareaComponent extends ExtendInputsComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
