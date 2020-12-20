import { Component, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ValidatorsService } from '../../../../../core/service/validators.service';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-email-ng',
    templateUrl: 'input-email.component.html',
})

export class InputEmailComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {

        config.validators.push(ValidatorsService.emailValidator)

        this.configInput(config)

        this.addControlForm();
    }

    constructor() {
        super();
    }

    ngOnInit() { }
}
