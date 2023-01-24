import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { BroadcastEventService, ValidatorsService, ValidtionError } from 'cocori-ng/src/feature-core';
import { merge, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { DefaultConfigComponent } from '../../../../core/config/config.components';
import { ConfigEvents } from '../../../../core/config/config.events';

@Component({
    selector: '[error-handler]',
    template: `
        <ng-container *ngIf="(errorMessage$ | async) as errorMessage">
            <mat-error>{{errorMessage}}</mat-error>
        </ng-container>
    `,
    styleUrls: ['./cocoring-input-error.component.scss']
})

export class CocoringInputErrorComponent implements OnInit, OnDestroy {
    @Input() form: UntypedFormGroup;
    @Input() controlName: string;

    private formId: string;

    errorMessage$: any;

    constructor(
        private broadcastEventService: BroadcastEventService,
        private validatorsService: ValidatorsService) { }

    ngOnInit() {

        if (!this.form.get(DefaultConfigComponent.form.keyId)) return;

        this.formId = this.form.get(DefaultConfigComponent.form.keyId).value as string

        const onSubmitObs: Observable<unknown> = this.broadcastEventService.listen([ConfigEvents.FORM_SUBMITTED, this.formId])
        const valueChangesObs: Observable<unknown> = this.form.get(this.controlName).valueChanges

        this.mergeObservables(onSubmitObs, valueChangesObs)
    }

    ngOnDestroy() { }

    private mergeObservables(onSubmitObs: Observable<unknown>, valueChangesObs: Observable<unknown>) {
        this.errorMessage$ = merge(
            onSubmitObs,
            valueChangesObs
        )
            .pipe(
                filter((value: any) => this.form.get(this.controlName).errors !== null),
                map((value: any) => this.form.get(this.controlName).errors),
                map((formError: ValidationErrors) => {
                    const errorKey: string = Object.keys(formError)[0]

                    /** pour déclencher l'erreur angular material */
                    this.form.get(this.controlName).markAsTouched()

                    return this.validatorsService.getValidationErrorMessage(<ValidtionError>{ key: errorKey, value: formError[errorKey] })
                })
            )
    }
}
