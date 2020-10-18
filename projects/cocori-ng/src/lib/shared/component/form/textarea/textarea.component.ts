import { Component, OnInit } from '@angular/core';

import { BaseInputFormComponent } from '../base-inputform.component';

@Component({
    selector: 'ct-textarea',
    templateUrl: 'textarea.component.html',
})

export class TextareaComponent extends BaseInputFormComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.init();
    }
}
