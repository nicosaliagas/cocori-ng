import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateTime } from 'luxon';
import { takeUntil } from 'rxjs';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { HelperService } from '../../../../../core/service/helper/helper.service';
import { ValidatorsService } from '../../../../../core/service/validators.service';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-date',
    templateUrl: 'cocoring-date.component.html',
    styleUrls: ['./cocoring-date.component.scss'],
})

export class CocoringDateComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {

        config.validators.push(ValidatorsService.dateValidator)

        this.configInput(config)

        this.addControlForm();

        this.maskInputControlName = `m${this.nameControl}`

        /** le masque de saisie ne fonctionne pas avec le composant de material datepicker */
        this.addDateMaskControl()

        this.valueChangeEvent()

    }

    // dateMask: any = { guide: false, showMask : false, mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/], placeholderChar: '\u2000' };

    maskInputControlName: string = null

    constructor(
        @Inject(MAT_DATE_LOCALE) public locale: string,
        private cdr: ChangeDetectorRef,
        injector: Injector) {
        super(injector);
    }

    ngOnInit() { }

    /** Value from datepicker changed event */
    valueChangeEvent() {
        this.formGroup.get(this.nameControl).valueChanges.pipe(
            takeUntil(this.destroy$)
        ).subscribe((val) => {
            let d = null;

            if (!val) return;

            if (typeof val.getMonth === 'function' || typeof val === 'string') {
                d = DateTime.fromJSDate(new Date(val)).setLocale(this.locale).toLocaleString() // sous la forme de 21/12/2021
            } else if ((<Object>val).hasOwnProperty("isLuxonDateTime")) {
                d = DateTime.fromISO(val).setLocale(this.locale).toLocaleString() // sous la forme de 21/12/2021
            }

            if (d) {
                this.formGroup.get(this.maskInputControlName).setValue(HelperService.replaceAll(d, '/', ''))

                setTimeout(() => { // bogue dans le rendu sinon...
                    this.cdr.detectChanges()
                });
            }
        })
    }

    private maskInputChangeEvent() {
        this.formGroup.get(this.maskInputControlName).valueChanges.pipe(
            takeUntil(this.destroy$)
        ).subscribe((dateInput: string) => {
            this.dispatchValueInput(dateInput)
        })
    }

    private dispatchValueInput(dateInput: string) {
        if (dateInput && dateInput.length === 8) {
            const day = dateInput.substring(0, 2)
            const month = dateInput.substring(2, 4)
            const year = dateInput.substring(4)

            const dateFormated: DateTime = DateTime.fromISO(year + month + day)

            if (dateFormated.isValid) {
                this.formGroup.get(this.nameControl).setValue(DateTime.fromISO(year + month + day), { emitEvent: false })
            } else this.clearDateMaskValue()
        } else {
            this.clearValue()
        }
    }

    onBlur() {
        const dateInput: string = this.formGroup.get(this.maskInputControlName).value

        if (!dateInput || dateInput.length !== 8) {
            this.clearDateMaskValue()
        }
    }

    private addDateMaskControl() {
        this.formGroup.addControl(this.maskInputControlName, new FormControl(null, this.validators))

        this.maskInputChangeEvent()

        this.emitEvent()
    }

    clearDateMaskValue(event?: any) {
        this.formGroup.get(this.maskInputControlName).reset()
        this.formGroup.get(this.maskInputControlName).markAsUntouched()

        this.clearValue(event)

        if (event) event.stopPropagation();
    }
}
