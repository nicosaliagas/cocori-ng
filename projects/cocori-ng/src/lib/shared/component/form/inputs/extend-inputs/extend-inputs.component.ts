import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';

import { ConfigInputComponent, NameControl } from '../../../../../core/model/component-inputs.model';
import { DataSourceInput, DataSourceType } from '../../../../../core/model/data-source.model';
import { HttpService } from '../../../../../core/service/http.service';
import { ValidatorsService } from '../../../../../core/service/validators.service';

@Component({
    selector: 'extend-inputs',
    template: '',
    host: { 'class': 'input-form' }
})

export abstract class ExtendInputsComponent {
    @Input() formGroup: FormGroup
    @Input() nameControl: NameControl
    @Input() nameLabel: string
    
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    dataSource$: Observable<any>;
    inRelationWith: NameControl;
    validators: ValidatorFn[];
    appearance: MatFormFieldAppearance; // = 'outline' // standard // https://material.angular.io/components/form-field/api#MatFormFieldAppearance
    httpService: HttpService;
    styleCompact: boolean;

    constructor(injector: Injector) {
        this.httpService = injector.get(HttpService);
    }

    configInput(config: ConfigInputComponent) {
        this.nameLabel = config.nameLabel;
        this.nameControl = config.nameControl;
        this.formGroup = config.formGroup;
        this.styleCompact = config.styleCompact;
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

    addControlForm() {
        this.formGroup.addControl(this.nameControl, new FormControl(null, this.validators))

        this.emitEvent()
    }

    loadDataSource(configDataSource: DataSourceInput): Observable<any> {
        if (!configDataSource) return;

        switch (configDataSource.type) {
            case DataSourceType.BRUTE:
                return of(configDataSource.value)
                break;

            case DataSourceType.API:
                return this.getDataSource(<string>configDataSource.value)
                break;

            default:
                return null
                break;
        }
    }

    private inRelatioNWith() {
        if (this.inRelationWith && typeof this.inRelationWith !== 'undefined') {

            console.log("inRelationWith>>", this.inRelationWith, this.formGroup)

            this.formGroup.get(this.inRelationWith).valueChanges.subscribe((parentValue) => {
                console.log("Parent Value ", parentValue);
            })
        }
    }

    private isControlRequired(): boolean {
        const d = this.validators.find((validatorFn) => validatorFn === ValidatorsService.require)

        return typeof d === 'undefined' ? false : true
    }

    private getDataSource(api: string): Observable<any> {
        return this.httpService.get(api)
    }
}
