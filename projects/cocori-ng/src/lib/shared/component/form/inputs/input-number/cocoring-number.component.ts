import { ChangeDetectionStrategy, Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfigInputComponent } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, tap } from 'rxjs/operators';

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
        this.subscriptions.add(
            this.formGroup.get(this.nameControl).valueChanges.pipe(
                filter(value => this.maxlength && String(value).length > this.maxlength && value > 0),
                tap(value => {
                    this.formGroup.get(this.nameControl).setValue(String(value).slice(0, this.maxlength), { emitEvent: false })
                })
            ).subscribe()
        )
    }
}
