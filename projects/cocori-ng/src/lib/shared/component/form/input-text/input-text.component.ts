import { Component, OnInit } from '@angular/core';

import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-text-ng',
    templateUrl: 'input-text.component.html',
})

export class InputTextComponent extends ExtendInputsComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() { }
}
