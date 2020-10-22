import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';

import { ComponentInputFormModel } from '../../../../core/model/component-input-form.model';
import { SchemaDatasForm, SchemaFieldForm } from '../../../../core/model/schema-datas.model';
import { InjectComponentService } from '../../../../core/service/inject-component.service';
import { SubscriptionService } from '../../../../core/service/subscription.service';


@Component({
    selector: 'form-container-ng',
    templateUrl: 'form-container.component.html',
    providers: [SubscriptionService]
})

export class FormContainerComponent implements OnInit, OnDestroy {
    @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

    currentForm: FormGroup;
    schemaDatasForm: SchemaDatasForm;
    formBuildedSubject: Subject<boolean>; /** tous les composants fields ont été ajoutés à la vue */

    @Input()
    set config(schema: SchemaDatasForm) {
        if (!schema) return;

        this.schemaDatasForm = schema;

        /** on enlève les précédents composants ajoutés à la vue */
        this.currentForm = this.fb.group({});
        this.formContainerRef.clear();

        this.initEventFormBuilded();
        this.buildCurrentForm();
    }

    @Output() onComponentReady: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onFormulaireValidate: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public fb: FormBuilder,
        public injectComponentService: InjectComponentService,
        public subscriptionService: SubscriptionService) {
        this.currentForm = this.fb.group({});
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }

    private buildCurrentForm() {
        this.schemaDatasForm.fields.forEach((field: SchemaFieldForm) => {
            this.currentForm.addControl(field.name, new FormControl());

            const configFieldForm: ComponentInputFormModel = { formGroup: this.currentForm, nameControl: field.name, nameLabel: field.label };

            const componentToAdd = this.injectComponentService.returnComponentClassFromType(field.type);

            this.injectComponentService.loadAndAddComponentToContainer(componentToAdd, this.formContainerRef,
                [{ config: configFieldForm }],
                [{ onComponentReady: this.childAdded.bind(this) }]
            );
        });
    }

    private initEventFormBuilded() {
        this.formBuildedSubject = new Subject<boolean>();
        let formFieldsAdded: number = 0;

        this.subscriptionService.subscribe = this.formBuildedSubject.subscribe((isBuilded: boolean) => {
            formFieldsAdded++;

            if (formFieldsAdded === this.schemaDatasForm.fields.length) {
                this.onComponentReady.emit(true);
            }
        });
    }

    private childAdded(nameControl: string) {
        // console.log(`composant ajouté : ${nameControl}`);

        this.formBuildedSubject.next(true);
    }

    validateFrom({ value, valid }: { value: any, valid: boolean }) {
        if (valid) {
            this.onFormulaireValidate.emit(value);
        }
    }
}
