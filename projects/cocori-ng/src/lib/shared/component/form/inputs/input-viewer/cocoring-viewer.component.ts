import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigInputComponent } from '@cocori-ng/lib/src/lib/feature-core';

import {
    ExtendInputsComponent,
} from '../../../../../feature-core/shared/component/form/inputs/extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-viewer-ng',
    templateUrl: 'cocoring-viewer.component.html',
})

export class CocoringViewerComponent extends ExtendInputsComponent implements OnInit {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    nameControl: string;

    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addForm()
    }

    constructor(private fb: FormBuilder, injector: Injector) {
        super(injector);
    }

    ngOnInit() {
    }

    private addForm() {
        const nestedFrom: FormGroup = this.fb.group({
            windowingMin: null,
            windowingMax: null,
            rangeMin: null,
            rangeMax: null,
            lut: null
        })

        this.formGroup.addControl(this.nameControl, nestedFrom)

        this.emitEvent()
    }
}
