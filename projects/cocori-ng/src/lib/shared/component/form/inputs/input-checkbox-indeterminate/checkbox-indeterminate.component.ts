import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigInputComponent, FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';

import {
    ExtendInputsComponent,
} from '../../../../../feature-core/shared/component/form/inputs/extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-checkbox-indeterminate',
    templateUrl: 'checkbox-indeterminate.component.html',
    styleUrls: ['./checkbox-indeterminate.component.scss'],
    providers: [FormHelperService]
})

export class CocoringCheckboxIndeterminateComponent extends ExtendInputsComponent {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();

        this.addNestedForm()
    }

    allComplete: boolean = false;
    someComplete: boolean = false;

    task: any = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
            { name: 'Primary', completed: false },
            { name: 'Accent', completed: false },
            { name: 'Warn', completed: false }
        ]
    };

    constructor(
        private fb: FormBuilder,
        private formHelperService: FormHelperService,
        injector: Injector) {
        super(injector);
    }

    private addNestedForm() {
        const nestedFrom: FormGroup = this.fb.group({
            noSelected: null,
            allSelected: null,
        })

        this.formGroup.addControl('nestedForm', nestedFrom)

        this.formChangeEvent()
        
        this.nestedFormChangeEvent()
    }

    private formChangeEvent() {
        this.subscriptions.add(
            this.formGroup.get(this.nameControl).valueChanges.subscribe((value: boolean) => {
                this.setValueControls(value)
            })
        )
    }

    private setValueControls(value: boolean) {
        Object.keys(this.formGroup.get('nestedForm')['controls']).forEach(key => {
            this.formGroup.get('nestedForm')['controls'][key].setValue(value, { emitEvent: false })
        });
    }

    private nestedFormChangeEvent() {
        const nestedFormPropertiesLength: number = this.formHelperService.countControlsForm(<FormGroup>this.formGroup.get('nestedForm'))

        this.subscriptions.add(
            this.formGroup.get('nestedForm').valueChanges.subscribe((values) => {
                const completed: any[] = Object.entries(values).filter(([key, value]) => <boolean>value === true)

                if (completed.length === nestedFormPropertiesLength) {
                    this.allComplete = true
                    this.someComplete = false
                } else if (completed.length > 0 && completed.length < nestedFormPropertiesLength) {
                    this.someComplete = true
                    this.allComplete = false
                } else {
                    this.someComplete = false
                    this.allComplete = false
                }
            })
        )
    }
}
