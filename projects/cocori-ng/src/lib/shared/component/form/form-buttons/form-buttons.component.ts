import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { SchemaForm } from '../../../../core/model/schema-datas.model';
import { FormBuilderService } from '../../../../core/service/form.service';
import { SubscriptionService } from '../../../../core/service/subscription.service';

@Component({
    selector: 'form-buttons-ng',
    templateUrl: 'form-buttons.component.html',
    providers: [SubscriptionService]
})

export class FormButtonsComponent implements OnInit, OnDestroy {
    @ViewChild('ButtonsContainerRef', { static: true, read: ViewContainerRef }) buttonsContainerRef: ViewContainerRef;

    schemaDatasForm: SchemaForm;

    @Input()
    set config(schema: SchemaForm) {
        if (!schema) return;

        this.schemaDatasForm = schema;

        // this.buttonsContainerRef.clear();

        this.buildCurrentForm();
    }

    constructor(
        public formBuilderService: FormBuilderService,
        public subscriptionService: SubscriptionService) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }

    private buildCurrentForm() {

    }
}
