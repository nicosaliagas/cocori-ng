import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';

import { SchemaDatasForm, SchemaFieldForm } from '../../../../core/model/schema-datas.model';
import { FormBuilderService } from '../../../../core/service/form.service';
import { InjectComponentService } from '../../../../core/service/inject-component.service';
import { SubscriptionService } from '../../../../core/service/subscription.service';


@Component({
    selector: 'form-container-ng',
    templateUrl: 'form-container.component.html',
    providers: [SubscriptionService, FormBuilderService]
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
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public fb: FormBuilder,
        private formBuilderService: FormBuilderService,
        public injectComponentService: InjectComponentService,
        public subscriptionService: SubscriptionService) {
        this.currentForm = this.fb.group({});
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }

    private buildCurrentForm() {
        const formBuilder: FormBuilderService =
            this.formBuilderService
                .viewContainerRef(this.formContainerRef)
                .onInputReady(this.childAdded.bind(this));

        this.schemaDatasForm.fields.forEach((field: SchemaFieldForm) => {
            formBuilder.addInput(field.name, field.label, field.type);
        });

        this.currentForm = this.formBuilderService.form;
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

    /** composant aijouté au formulaire angular */
    private childAdded(nameControl: string) {
        this.formBuildedSubject.next(true);
    }

    validateFrom({ value, valid }: { value: any, valid: boolean }) {
        if (valid) {
            this.onSubmit.emit(value);
        }
    }
}
