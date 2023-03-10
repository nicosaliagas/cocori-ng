import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {
    ButtonSchema,
    CommandMappings,
    FieldSchema,
    FormContainerInputs,
    FormSchema,
    MappingBuilderService,
    SubmitDatas,
} from 'cocori-ng/src/feature-core';
import { Subject, takeUntil } from 'rxjs';

import { FormBuilderService } from '../../../../core';

@Component({
    selector: 'cocoring-form-container',
    templateUrl: 'cocoring-form-container.component.html',
    providers: [FormBuilderService, MappingBuilderService]
})

export class CocoringFormContainerComponent implements OnDestroy {
    @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

    currentForm: UntypedFormGroup;
    schemaDatasForm: FormSchema;
    formBuildedSubject: Subject<boolean>; /** tous les composants fields ont été ajoutés à la vue */
    schemaDatasButtons: ButtonSchema[];
    objectCommand: Object = {};

    private readonly destroy$ = new Subject();

    @Input()
    set config(formSchema: FormContainerInputs) {
        if (!formSchema) return;

        this.schemaDatasForm = formSchema.form;

        /** todo: filtrer les boutons associés au formulaire en entrée */
        const schemaDatasButtons = formSchema.buttons || [];

        this.schemaDatasButtons = this.filterButtonsAssociatedToForm(this.schemaDatasForm, "name", schemaDatasButtons, "formName");

        this.formBuilderService.newForm();
        this.formContainerRef.clear();

        this.initEventFormBuilded();
        this.buildCurrentForm();
    }

    @Output() onComponentReady: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public fb: UntypedFormBuilder,
        public formBuilderService: FormBuilderService,
        public mappingBuilderService: MappingBuilderService
    ) {
        this.formBuilderService.newForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(undefined);
        this.destroy$.complete();
    }

    private buildCurrentForm() {
        const formBuilder: FormBuilderService =
            this.formBuilderService
                .identityForm(this.schemaDatasForm.id, this.schemaDatasForm.name)
                .setViewContainerRef(this.formContainerRef);

        this.schemaDatasForm.fields.forEach((field: FieldSchema) => {
            formBuilder.addInput(field.name, config => config
                .nameLabel(field.label)
                .inRelationWith(<never>field.inRelationWith)
                .dataSource(field.dataSource)
                .typeInput(field.type)
            );
        });

        /** todo: Utiliser une variable ou direct l'objet */
        this.currentForm = this.formBuilderService.form;
    }

    /** lorsque tous les composants ont été initialisés avec succès */
    private initEventFormBuilded() {
        this.formBuildedSubject = new Subject<boolean>();
        let formFieldsAdded: number = 0;

        this.formBuildedSubject.pipe(
            takeUntil(this.destroy$)
        ).subscribe((isBuilded: boolean) => {
            formFieldsAdded++;

            if (formFieldsAdded === this.schemaDatasForm.fields.length) {
                this.onComponentReady.emit(true);
            }
        })
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
