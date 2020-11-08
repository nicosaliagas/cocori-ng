import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ButtonSchema } from '../../../../core/model/schema-datas.model';
import { FormBuilderService } from '../../../../core/service/form.service';
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

        console.log("current form", this.formBuilderService.form);
        console.log("schemaDatasButtons", buttonsSchema);

        if (buttonsSchema && buttonsSchema.length) {
            this.buildView(buttonsSchema);
        }
    }

    constructor(
        private injectComponentService: InjectComponentService,
        public formBuilderService: FormBuilderService,
        public subscriptionService: SubscriptionService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }

    buildView(buttons: ButtonSchema[]) {

        const formBuilder: FormBuilderService = this.formBuilderService
            .setViewContainerRef(this.buttonsContainerRef)

        buttons.forEach((button: ButtonSchema) => {

            formBuilder
                .addButton(button.text, button.submit, this.buttonAddCallback.bind(this));
        })
    }

    buttonAddCallback(nameControl: string) {
        console.log("Bouton ajouté avec succès : ", nameControl);
    }
}
