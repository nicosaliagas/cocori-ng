import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { configdefault } from '../../../../../config/config.components';
import { ButtonComponentInputs, TypeButtonEnum } from '../../../../../core/model/component-inputs.model';

@Component({
    selector: 'button-ng',
    templateUrl: 'button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    @Input() text: string = configdefault.button.text;
    @Input() type: TypeButtonEnum = TypeButtonEnum.SUBMIT;
    @Input() class: string;

    onClickSubmit: Function;

    constructor() { }

    @Input()
    set config(config: ButtonComponentInputs) {
        if (!config) return;

        this.text = config.text;
        this.type = config.type;
        this.onClickSubmit = config.onClickSubmit;
    }

    ngOnInit() {
        this.callback.emit(this.text);
    }

    onClick() {
        if (this.type === TypeButtonEnum.SUBMIT && this.onClickSubmit) this.onClickSubmit()
    }
}
