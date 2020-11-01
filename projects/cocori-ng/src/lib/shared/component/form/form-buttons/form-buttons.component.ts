import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ButtonSchema } from '../../../../core/model/schema-datas.model';
import { SubscriptionService } from '../../../../core/service/subscription.service';

@Component({
    selector: 'form-buttons-ng',
    templateUrl: 'form-buttons.component.html',
    providers: [SubscriptionService]
})

export class FormButtonsComponent implements OnInit, OnDestroy {
    @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) buttonsContainerRef: ViewContainerRef;

    schemaDatasButtons: ButtonSchema[];

    @Input()
    set config(buttonsSchema: ButtonSchema[]) {
        if (!buttonsSchema) return;

        this.schemaDatasButtons = buttonsSchema;

        console.log("schemaDatasButtons", this.schemaDatasButtons);
    }

    constructor(
        public subscriptionService: SubscriptionService) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }
}
