import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { filter, tap } from 'rxjs/internal/operators';
import { map } from 'rxjs/internal/operators/map';

import { configdefault } from '../../../../config/config.components';
import { ConfigEvents } from '../../../../config/config.events';
import { BroadcastEventService } from '../../../../core/service/broadcast-event.service';
import { ToastMessageService } from '../../../../core/service/toast-message.service';
import { ValidatorsService, ValidtionError } from '../../../../core/service/validators.service';

@Component({
    selector: 'input-error-handler',
    template: `
        <i *ngIf="errorMessage" (click)="toastMessage()" [title]="errorMessage" class="error material-icons">
            <ng-container>error_outline</ng-container>
            <!-- <ng-container *ngIf="revealPasswordStatus" >error</ng-container> -->
        </i>
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

        this.broadcastEventService.listen([ConfigEvents.FORM_SUBMITTED, this.formId])
            .pipe(
                tap(() => this.errorMessage = null),
                filter((form: FormGroup) => form.get(this.controlName).errors !== null),
                map((form: FormGroup) => form.get(this.controlName).errors),
                map((formError: ValidationErrors) => {
                    const errorKey: string = Object.keys(formError)[0]

                    this.errorMessage = this.validatorsService.getValidationErrorMessage(<ValidtionError>{ key: errorKey, value: formError[errorKey] })
                })
            ).subscribe()
    }

    ngOnDestroy() { }

    toastMessage() {
        this.toastMessageService.error(this.errorMessage)
    }
}
