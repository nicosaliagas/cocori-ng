import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/internal/operators';
import { map } from 'rxjs/internal/operators/map';

import { configdefault } from '../../../../config/config.components';
import { ConfigEvents } from '../../../../config/config.events';
import { BroadcastEventService } from '../../../../core/service/broadcast-event.service';
import { ToastMessageService } from '../../../../core/service/toast-message.service';
import { ValidatorsService, ValidtionError } from '../../../../core/service/validators.service';

@Component({
    selector: '[error-handler]',
    template: `
        <ng-container *ngIf="errorMessage">
            <!-- <span class="error">{{errorMessage}}</span> -->
            <mat-error>{{errorMessage}}</mat-error>
        </ng-container>
        <!-- <i *ngIf="errorMessage" (click)="toastMessage()" [title]="errorMessage" class="error material-icons">
            <ng-container>error_outline</ng-container>
        </i> -->
    `,
    styleUrls: ['./input-error-handler.component.scss']
})

export class InputErrorHandlerComponent implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() controlName: string;

    private formId: string;
    public errorMessage: string;

    constructor(
        private broadcastEventService: BroadcastEventService,
        private validatorsService: ValidatorsService,
        private toastMessageService: ToastMessageService) { }

    ngOnInit() {
        this.formId = this.form.get(configdefault.form.keyId).value as string

        const onSubmitObs: Observable<unknown> = this.broadcastEventService.listen([ConfigEvents.FORM_SUBMITTED, this.formId])
        const valueChangesObs: Observable<unknown> = this.form.get(this.controlName).valueChanges

        this.mergeObservables(onSubmitObs, valueChangesObs)
    }

    ngOnDestroy() { }

    private mergeObservables(onSubmitObs: Observable<unknown>, valueChangesObs: Observable<unknown>) {
        merge(
            onSubmitObs,
            valueChangesObs
        )
            .pipe(
                tap(() => { this.errorMessage = null }),
                filter((value: any) => this.form.get(this.controlName).errors !== null),
                map((value: any) => this.form.get(this.controlName).errors),
                map((formError: ValidationErrors) => {
                    const errorKey: string = Object.keys(formError)[0]

                    /** pour déclencher l'erreur angular material */
                    this.form.get(this.controlName).markAsTouched()

                    this.errorMessage = this.validatorsService.getValidationErrorMessage(<ValidtionError>{ key: errorKey, value: formError[errorKey] })
                })
            ).subscribe()
    }

    toastMessage() {
        this.toastMessageService.error(this.errorMessage)
    }
}
