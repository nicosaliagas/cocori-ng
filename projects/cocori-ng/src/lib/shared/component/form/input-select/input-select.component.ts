import { Component, Input, OnInit } from '@angular/core';

import { InputComponentInputs } from '../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'input-select-ng',
    templateUrl: 'input-select.component.html',
})

export class InputSelectComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: InputComponentInputs) {
        this.configInput(config)

        this.addDefaultForm()
    }

    constructor() {
        super();
    }

    // foods: Food[] = [
    //     { value: 'steak-0', viewValue: 'Steak' },
    //     { value: 'pizza-1', viewValue: 'Pizza' },
    //     { value: 'tacos-2', viewValue: 'Tacos' }
    // ];

    ngOnInit() { }
}
