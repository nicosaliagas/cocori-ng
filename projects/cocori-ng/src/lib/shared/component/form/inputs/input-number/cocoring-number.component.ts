import { ChangeDetectionStrategy, Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfigInputComponent } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, takeUntil } from 'rxjs/operators';

import {
    ExtendInputsComponent,
} from '../../../../../feature-core/shared/component/form/inputs/extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-number',
    templateUrl: 'cocoring-number.component.html',
})

export class CocoringNumberComponent extends ExtendInputsComponent implements OnInit, OnDestroy {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.formGroup.get(this.nameControl).valueChanges.pipe(
            takeUntil(this.destroy$),
            filter(value => this.maxlength && String(value).length > this.maxlength && value > 0),
        ).subscribe((value) => {
            this.formGroup.get(this.nameControl).setValue(String(value).slice(0, this.maxlength), { emitEvent: false })
        })
    }
}
