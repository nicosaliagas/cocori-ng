import { Component, EventEmitter, Injector, Input, OnDestroy, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

import {
    ConfigInputComponent,
    InputFieldAppearance,
    OutputCallback,
} from '../../../../../core/model/component-inputs.model';
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
    @Input() formGroup: UntypedFormGroup
    @Input() nameControl: string
    @Input() nameLabel: string
    @Input() color: string = 'primary' /** à factoriser dans le helper pour la construction de form */

    /** méthode appelée lorsque que le contrôle a été ajouté au formulaire avec en paramètre le nom du contrôle créé */
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    public readonly destroy$ = new Subject();

    dataSource$: Observable<any>;
    dataSourceNameProperty: string
    inRelationWith: string;
    validators: ValidatorFn[];
    appearance: InputFieldAppearance;
    httpService: HttpService;
    datasourceService: DatasourceService;
    styleCompact: boolean;
    maxlength: number;
    icon: string;
    callbackComponent: OutputCallback;

    constructor(injector: Injector) {
        this.httpService = injector.get(HttpService);
        this.datasourceService = injector.get(DatasourceService);
    }

    ngOnDestroy() {
        this.destroy$.next(undefined);
        this.destroy$.complete();
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
        this.callbackComponent = config.callbackComponent

        this.nameLabel += this.isControlRequired() ? ' *' : ''
    }

    emitEvent() {
        if (!this.formGroup || !this.nameControl) {
            throw new Error(`Données formulaire manquantes, formGroup : ${this.formGroup} - nameControl : ${this.nameControl}`);
        }

        this.inRelatioNWith()

        if (this.callbackComponent) {
            this.callbackComponent.callback(this.nameControl)
        } else {
            this.callback.emit(this.nameControl);
        }
    }

    clearValue(event?: any) {
        this.formGroup.get(this.nameControl).reset()
        this.formGroup.get(this.nameControl).markAsUntouched()

        if(event) event.stopPropagation();
    }

    addControlForm() {
        if (this.controlAlreadyAdded()) return;

        this.formGroup.addControl(this.nameControl, new UntypedFormControl(null, this.validators))

        this.emitEvent()
    }

    addArrayForm() {
        if (this.controlAlreadyAdded()) return;

        this.formGroup.addControl(this.nameControl, new UntypedFormArray([], this.validators))

        this.emitEvent()
    }

    private controlAlreadyAdded(): boolean {
        return this.formGroup.contains(this.nameControl)
    }

    loadDataSource(configDataSource: DataSourceInput): Observable<any> {
        if (!configDataSource) return;

        this.dataSourceNameProperty = configDataSource.dataSourceNameProperty || 'name'

        return this.datasourceService.loadDataSource(configDataSource)
    }

    private inRelatioNWith() {
        if (this.inRelationWith && typeof this.inRelationWith !== 'undefined') {

            console.log("inRelationWith>>", this.inRelationWith, this.formGroup)

            this.formGroup.get(this.inRelationWith).valueChanges.pipe(
                takeUntil(this.destroy$),
            ).subscribe((parentValue) => {
                console.log("Parent Value ", parentValue);
            })
        }
    }

    private isControlRequired(): boolean {
        if (!this.validators) return;

        const d = this.validators.find((validatorFn: Function) => validatorFn.name === ValidatorsService.require.name)

        return typeof d === 'undefined' ? false : true
    }
}
