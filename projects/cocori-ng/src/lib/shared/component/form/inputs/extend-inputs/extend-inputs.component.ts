import { Component, EventEmitter, Injector, Input, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ConfigInputComponent, InputFieldAppearance, NameControl } from '../../../../../core/model/component-inputs.model';
import { DataSourceInput } from '../../../../../core/model/data-source.model';
import { DatasourceService } from '../../../../../core/service/datasource.service';
import { HttpService } from '../../../../../core/service/http.service';
import { ValidatorsService } from '../../../../../core/service/validators.service';

@Component({
    selector: 'extend-inputs',
    template: '',
    host: { 'class': 'input-form' }
})

export abstract class ExtendInputsComponent implements OnDestroy {
    @Input() formGroup: FormGroup
    @Input() nameControl: NameControl
    @Input() nameLabel: string

    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    subscriptions: Subscription = new Subscription();

    dataSource$: Observable<any>;
    inRelationWith: NameControl;
    validators: ValidatorFn[];
    appearance: InputFieldAppearance;
    httpService: HttpService;
    datasourceService: DatasourceService;
    styleCompact: boolean;
    maxlength: number;
    icon: string;

    constructor(injector: Injector) {
        this.httpService = injector.get(HttpService);
        this.datasourceService = injector.get(DatasourceService);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    configInput(config: ConfigInputComponent) {
        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;
        this.styleCompact = config.styleCompact;
        this.maxlength = config.maxlength;
        this.icon = config.icon;
        this.appearance = config.appearance;
        this.dataSource$ = this.loadDataSource(config.dataSource)
        this.inRelationWith = config.inRelationWith
        this.validators = config.validators

        this.nameLabel += this.isControlRequired() ? ' *' : ''
    }

    emitEvent() {
        if (!this.formGroup || !this.nameControl) {
            throw new Error(`Données formulaire manquantes, formGroup : ${this.formGroup} - nameControl : ${this.nameControl}`);
        }

        this.inRelatioNWith()

        this.callback.emit(this.nameControl);
    }

    clearValue(event: any) {
        this.formGroup.get(this.nameControl).reset()
        this.formGroup.get(this.nameControl).markAsUntouched()

        event.stopPropagation();
    }

    addControlForm() {
        this.formGroup.addControl(this.nameControl, new FormControl(null, this.validators))

        this.emitEvent()
    }

    addArrayForm() {
        this.formGroup.addControl(this.nameControl, new FormArray([], this.validators))

        this.emitEvent()
    }

    loadDataSource(configDataSource: DataSourceInput): Observable<any> {
        if (!configDataSource) return;

        return this.datasourceService.loadDataSource(configDataSource)
    }

    private inRelatioNWith() {
        if (this.inRelationWith && typeof this.inRelationWith !== 'undefined') {

            console.log("inRelationWith>>", this.inRelationWith, this.formGroup)

            this.subscriptions.add(
                this.formGroup.get(this.inRelationWith).valueChanges.subscribe((parentValue) => {
                    console.log("Parent Value ", parentValue);
                })
            )
        }
    }

    private isControlRequired(): boolean {
        if (!this.validators) return;

        const d = this.validators.find((validatorFn) => validatorFn === ValidatorsService.require)

        return typeof d === 'undefined' ? false : true
    }
}
