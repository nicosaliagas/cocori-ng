import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { configdefault } from '../../../../config/config.components';
import { ConfigEvents } from '../../../../config/config.events';
import { BroadcastEventService } from '../../../../core/service/broadcast-event.service';

@Component({
    selector: 'input-error-handler',
    template: `<span>oops une erreur</span>`
})

export class InputErrorHandlerComponent implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() controlName: string;

    private formId: string;

    constructor(private broadcastEventService: BroadcastEventService,) { }

    ngOnInit() {

        this.formId = this.form.get(configdefault.form.keyId).value as string

        console.log("inputErrorHandler", this.form.get(configdefault.form.keyId).value)

        this.broadcastEventService.listen([ConfigEvents.FORM_SUBMITTED, this.formId]).subscribe((form: FormGroup) => {
            console.log("PASSER LES DATAS DU FORM pour récupérer cet ID : ", this.controlName, form)
            console.log("erreurs", this.controlName, this.form.get(this.controlName).errors)


            // for (const errorsKey in this.form.get(this.controlName).errors) {
            //     console.log("erreurs", errorsKey)
            // }
        })
    }

    ngOnDestroy() { }
}
