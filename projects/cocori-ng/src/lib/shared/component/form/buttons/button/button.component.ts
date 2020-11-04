import { Component, Input } from '@angular/core';

import { configdefault } from '../../../../../config/config.components';
import { ButtonComponentInputs, TypeButtonEnum } from '../../../../../core/model/component-inputs.model';

@Component({
    selector: 'button-ng',
    templateUrl: 'button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

    @Input() text: string = configdefault.button.text;
    @Input() type: TypeButtonEnum = TypeButtonEnum.SUBMIT;

    constructor() { }

    @Input()
    set config(config: ButtonComponentInputs) {
        if (!config) return;

        this.text = config.text;
        this.type = config.type;
    }
}
