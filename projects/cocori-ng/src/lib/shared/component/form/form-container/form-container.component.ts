import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';

import { FormContainerInputs } from '../../../../core/model/component-inputs.model';
import { SubmitDatas } from '../../../../core/model/form-datas.model';
import { ButtonSchema, CommandMappings, FieldSchema, FormSchema } from '../../../../core/model/schema-datas.model';
import { ConfigInputBuilder, FormBuilderService } from '../../../../core/service/form.service';
import { InjectComponentService } from '../../../../core/service/inject-component.service';
import { MappingBuilderService } from '../../../../core/service/mapping.service';
import { SubscriptionService } from '../../../../core/service/subscription.service';

@Component({
    selector: 'form-container-ng',
    templateUrl: 'form-container.component.html',
    providers: [SubscriptionService, FormBuilderService, MappingBuilderService]
})

export class FormContainerComponent implements OnInit, OnDestroy {
    @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

    currentForm: FormGroup;
    schemaDatasForm: FormSchema;
    formBuildedSubject: Subject<boolean>; /** tous les composants fields ont été ajoutés à la vue */
    schemaDatasButtons: ButtonSchema[];

    objectCommand: Object = {};

    @Input()
    set config(formSchema: FormContainerInputs) {
        if (!formSchema) return;

        this.schemaDatasForm = formSchema.form;


        /** todo: filtrer les boutons associés au formulaire en entrée */
        const schemaDatasButtons = formSchema.buttons || [];

        this.schemaDatasButtons = this.filterButtonsAssociatedToForm(this.schemaDatasForm, "name", schemaDatasButtons, "formName");

        this.currentForm = this.formBuilderService.init();
        this.formContainerRef.clear();

        this.initEventFormBuilded();
        this.buildCurrentForm();
    }

    @Output() onComponentReady: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public fb: FormBuilder,
        public formBuilderService: FormBuilderService,
        public mappingBuilderService: MappingBuilderService,
        public injectComponentService: InjectComponentService,
        public subscriptionService: SubscriptionService) {
        this.currentForm = this.formBuilderService.init();
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeAll();
    }

    private buildCurrentForm() {
        const formBuilder: FormBuilderService =
            this.formBuilderService
                .nameForm(this.schemaDatasForm.name)
                .setViewContainerRef(this.formContainerRef);

        this.schemaDatasForm.fields.forEach((field: FieldSchema) => {
            formBuilder.addInput(field.name, new ConfigInputBuilder()
                .addOption('inputs', { nameLabel: field.label, dataSource: field.dataSource })
                .addOption('callbackComponent', this.childAdded.bind(this))
                .addOption('type', field.type)
            );
        });

        /** todo: Utiliser une variable ou direct l'objet */
        this.currentForm = this.formBuilderService.form;
    }

    /** lorsque tous les composants ont été initialisés avec succès */
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
        console.log("input ajouté avec succès : ", nameControl)
        this.formBuildedSubject.next(true);
    }

    validateForm({ value, valid }: { value: Object, valid: boolean }) {
        if (valid) {
            const mappedValues: Object = this.mapFormValues(value);

            this.onSubmit.emit(<SubmitDatas>{ rawValues: value, mappedValues: mappedValues });
        }
    }

    private filterButtonsAssociatedToForm<A, KA extends keyof A, B, KB extends keyof B>(objA: A, keyA: KA, objB: B[], keyB: KB): B[] {
        const tabOfB: B[] = [];

        objB.forEach((B) => {
            if (<unknown>B[keyB] === <unknown>objA[keyA]) {
                tabOfB.push(B);
            }
        })

        return tabOfB;
    }

    private mapFormValues(valueForm: Object): Object {
        const commandMappings: CommandMappings[] = this.schemaDatasButtons
            .find((button: ButtonSchema) => button.submit === true)
            ?.commandMappings

        this.mappingBuilderService.init();
        this.mappingBuilderService.setNameForm = this.schemaDatasForm.name;
        this.mappingBuilderService.valuesForm = valueForm;

        commandMappings.forEach((mapping: CommandMappings) => {
            this.mappingBuilderService.map(mapping)
        })

        console.log("mapping result", this.mappingBuilderService.getMapping())

        return this.mappingBuilderService.getMapping();
    }
}
