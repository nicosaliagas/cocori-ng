import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonSchema } from '@cocori-ng/lib/src/lib/feature-core';

import { FormBuilderService } from '../../../../core/service/form-builder/form-builder.service';

@Component({
    selector: 'cocoring-buttons-group',
    templateUrl: 'cocoring-buttons-group.component.html',
})

export class CocoringButtonsGroupComponent implements OnInit {
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
        public formBuilderService: FormBuilderService) { }

    ngOnInit() {
    }

    buildView(buttons: ButtonSchema[]) {

        const formBuilder: FormBuilderService = this.formBuilderService
            .setViewContainerRef(this.buttonsContainerRef)

        buttons.forEach((configSchema: ButtonSchema) => {

            formBuilder
                .addButton(configSchema.text, config => config
                    .isTypeSubmit(configSchema.submit)
                    .outputCallback(this.buttonAddCallback.bind(this)));
        })
    }

    buttonAddCallback(nameControl: string) {
        console.log("Bouton ajouté avec succès : ", nameControl);
    }
}
