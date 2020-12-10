import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConfigEvents } from '../../../../config/config.events';
import { BroadcastEventService } from '../../../../core/service/broadcast-event.service';

@Component({
    selector: 'input-error-handler',
    template: `<span>oops une erreur</span>`
})

export class InputErrorHandlerComponent implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() controlName: string;

    constructor(private broadcastEventService: BroadcastEventService,) { }

    ngOnInit() {
        this.broadcastEventService.listen(ConfigEvents.FORM_SUBMITTED).subscribe((name: string) => {
            console.log("name form : ", name)
        })
    }

    ngOnDestroy() { }
}
