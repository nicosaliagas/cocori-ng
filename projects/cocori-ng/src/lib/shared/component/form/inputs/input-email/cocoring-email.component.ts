import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ValidatorsService } from '../../../../../core/service/validators.service';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-email',
    templateUrl: 'cocoring-email.component.html',
})

export class CocoringEmailComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {

        config.validators.push(ValidatorsService.emailValidator)

        this.configInput(config)

        this.addControlForm();
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() { }
}