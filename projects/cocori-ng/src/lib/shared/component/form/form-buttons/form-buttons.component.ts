import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { InputComponents } from '..';
import { ButtonComponentInputs, TypeButtonEnum } from '../../../../core/model/component-inputs.model';
import { ButtonSchema } from '../../../../core/model/schema-datas.model';
import { InjectComponentService } from '../../../../core/service/inject-component.service';
import { SubscriptionService } from '../../../../core/service/subscription.service';

@Component({
    selector: 'form-buttons-ng',
    templateUrl: 'form-buttons.component.html',
    providers: [SubscriptionService]
})

export class FormButtonsComponent implements OnInit, OnDestroy {
    @ViewChild('ButtonsContainerRef', { static: true, read: ViewContainerRef }) buttonsContainerRef: ViewContainerRef;

    @Input()
    set config(buttonsSchema: ButtonSchema[]) {

        this.buttonsContainerRef.clear();

        if (!buttonsSchema) return;

        console.log("schemaDatasButtons", buttonsSchema);

        if (buttonsSchema && buttonsSchema.length) {
            this.buildView(buttonsSchema);
        }
    }

    constructor(
        private injectComponentService: InjectComponentService,
        public subscriptionService: SubscriptionService) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }

    buildView(buttons: ButtonSchema[]) {
        // todo: faire une classe comme formService
        buttons.forEach((button: ButtonSchema) => {
            const configFieldForm: ButtonComponentInputs = { text: button.text, type: button.submit ? TypeButtonEnum.SUBMIT : TypeButtonEnum.BUTTON };

            const componentToAdd = this.injectComponentService.returnComponentClassFromType(InputComponents.SUBMIT_BUTTON);

            this.injectComponentService.loadAndAddComponentToContainer(componentToAdd, this.buttonsContainerRef,
                [{ config: configFieldForm }],
                [this.buttonAddCallback.bind(this)]
            );
        })
    }

    buttonAddCallback(nameControl: string) {
        console.log("buttonAddCallback !!", nameControl);
    }
}
