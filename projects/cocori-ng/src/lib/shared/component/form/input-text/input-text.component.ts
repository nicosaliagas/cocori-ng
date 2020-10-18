import { Component, OnInit } from '@angular/core';

import { BaseInputFormComponent } from '../base-inputform.component';

@Component({
    selector: 'ct-input-text',
    templateUrl: 'input-text.component.html',
})

export class InputTextComponent extends BaseInputFormComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
