import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { ConfigInputComponent, ValidatorsService } from 'cocori-ng/src/feature-core';

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
