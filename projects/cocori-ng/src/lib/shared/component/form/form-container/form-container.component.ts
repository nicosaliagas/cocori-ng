import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { InputModel } from '../../../../core/model/field-form.model';
import { SchemaDatasForm, SchemaFieldForm } from '../../../../core/model/schema-datas.model';
import { GenerateFormService } from '../../../../core/service/generate-form.service';
import { InjectComponentService } from '../../../../core/service/inject-component.service';


@Component({
    selector: 'form-container-ng',
    templateUrl: 'form-container.component.html',
    providers: [GenerateFormService]
})

export class FormContainerComponent implements OnInit {
    @ViewChild('FormContainerRef', { static: true, read: ViewContainerRef }) formContainerRef: ViewContainerRef;

    currentForm: FormGroup;
    schemaDatasForm: SchemaDatasForm;

    @Input()
    set config(schema: SchemaDatasForm) {
        if (!schema) return;

        this.schemaDatasForm = schema;

        /** on enlève les précédents composants ajoutés à la vue */
        this.currentForm = this.fb.group({});
        this.formContainerRef.clear();

        this.buildCurrentForm();
    }

    @Output() onComponentReady: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onFormulaireValidated: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public fb: FormBuilder,
        public injectComponentService: InjectComponentService,
        public generateFormService: GenerateFormService) {
        this.currentForm = this.fb.group({});
    }

    ngOnInit() { }

    private buildCurrentForm() {
        this.schemaDatasForm.fields.forEach((field: SchemaFieldForm) => {
            this.currentForm.addControl(field.name, new FormControl());

            const configFieldForm: InputModel = { formGroup: this.currentForm, nameControl: field.name, nameLabel: field.label };

            const componentToAdd = this.generateFormService.returnComponentClassFromType(field.type);

            this.injectComponentService.loadAndAddComponent(componentToAdd, this.formContainerRef,
                [{ config: configFieldForm }],
                [{ onComponentReady: this.childAdded.bind(this) }]
            );
        });

        console.log("test ", Object.keys(this.currentForm.controls));
    }

    private childAdded(nameControl: string) {
        console.log(`composant ajouté : ${nameControl}`);

        /** todo: faire ça avec un subject */
        if (Object.keys(this.currentForm.controls).length === this.schemaDatasForm.fields.length) {
            console.log("c'est good");

            this.onComponentReady.emit(true);
        }
    }

    validateFrom({ value, valid }: { value: any, valid: boolean }) {
        console.log("FormContainerComponent > validateFrom", value)
    }
}
