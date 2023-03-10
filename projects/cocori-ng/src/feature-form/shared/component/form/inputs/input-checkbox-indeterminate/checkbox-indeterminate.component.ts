import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ConfigInputComponent } from 'cocori-ng/src/feature-core';
import { takeUntil } from 'rxjs';

import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-checkbox-indeterminate',
    templateUrl: 'checkbox-indeterminate.component.html',
    styleUrls: ['./checkbox-indeterminate.component.scss'],
})

export class CocoringCheckboxIndeterminateComponent extends ExtendInputsComponent {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();

        this.dataSource$.pipe(
            takeUntil(this.destroy$),
        ).subscribe((datasource: any[]) => {
            this.addNestedForm(datasource)
        })
    }

    nestedNameForm: string = 'nestedValues'
    someComplete: boolean = false;

    constructor(
        private fb: UntypedFormBuilder,
        private cdr: ChangeDetectorRef,
        injector: Injector) {
        super(injector);
    }

    private addNestedForm(datasource: any[]) {

        if (!datasource.length) return;

        const nestedFrom = this.fb.group({});

        datasource.forEach((datas: any) => {
            nestedFrom.addControl(datas.id, new UntypedFormControl(false))
        })

        this.formGroup.addControl(this.nestedNameForm, nestedFrom)

        this.formChangeEvent()

        this.nestedFormChangeEvent()
    }

    private formChangeEvent() {
        this.formGroup.get(this.nameControl).valueChanges.pipe(
            takeUntil(this.destroy$),
        ).subscribe((value: boolean) => {
            this.setValueControls(value)
        })
    }

    private setValueControls(value: boolean) {
        Object.keys(this.nestedForm['controls']).forEach(key => {
            this.nestedForm['controls'][key].setValue(value, { emitEvent: false })
        });
    }

    private nestedFormChangeEvent() {
        // const nestedFormPropertiesLength: number = this.formHelperService.countControlsForm(this.nestedForm)
        const nestedFormPropertiesLength: number = 3

        this.nestedForm.valueChanges.pipe(
            takeUntil(this.destroy$),
        ).subscribe((values) => {
            const completed: any[] = Object.entries(values).filter(([key, value]) => <boolean>value === true)

            if (completed.length === nestedFormPropertiesLength) {
                this.formGroup.get(this.nameControl).setValue(true, { emitEvent: false })

                setTimeout(() => {
                    this.someComplete = false
                    this.cdr.detectChanges()
                });
            } else if (completed.length > 0 && completed.length < nestedFormPropertiesLength) {
                this.formGroup.get(this.nameControl).setValue(false, { emitEvent: false })

                setTimeout(() => {
                    this.someComplete = true
                    this.cdr.detectChanges()
                });
            } else {
                this.someComplete = false
                this.formGroup.get(this.nameControl).setValue(false, { emitEvent: false })
            }
        })
    }

    private get nestedForm(): UntypedFormGroup {
        return <UntypedFormGroup>this.formGroup.get(this.nestedNameForm)
    }
}
