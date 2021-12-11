import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-password',
    templateUrl: 'cocoring-password.component.html',
})

export class CocoringPasswordComponent extends ExtendInputsComponent implements OnInit {

    type: string = "password"
    revealPasswordStatus: boolean = false;

    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() { }

    toggleRevealPassword() {
        this.revealPasswordStatus = !this.revealPasswordStatus;

        this.type = this.revealPasswordStatus ? 'text' : 'password'
    }    
}
