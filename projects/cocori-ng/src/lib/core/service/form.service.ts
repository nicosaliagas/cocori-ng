import { Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { InputTypes } from '../../shared/component/form';
import { ComponentInputFormModel } from '../model/component-inputs.model';
import { InjectComponentService } from './inject-component.service';

/**
 * https://www.typescriptlang.org/play?#code/C4TwDgpgBAggTgcwK4FsIDtgBVwQM4A8WAfFALxRZQQAewGAJnlABQB0HUAhongFxQAlugBmEOFACqASnKlhYiQCUoAfikD0EAG7iA3AChQkKEohgANlwDGEM8CRx0OSAQDyAGigA5UhXYcXALwyGiYLvjuxLJkpN6GRrhQAEJIghYM4gQA0tR0jMwA1hAgAPYiUADCpejWcBD0qemZcH5QAN4GUFAA2pJC6FDZALoC-bT06ExQAOQARmkZM2pVNXUNEE0Z4n3DUAJmljZ2DY7OuARd3au19Y2LLbseV91bLQQAojTWFkiZOV5JKQJgUoFpdBJ1PMHssBF8fn8IACpMRiFc0QBfBIiJC1YCCGpQBbNcQsaQCN5ZeG-f7FMoVaq3DaUuBeaHNGaojpXO5nMEQADuN3W9xJcDJ3GYXHQIEMGIMBh+XDwzEZIs2D3E3O6XDJAmAAAtBMxOtcoLynFBDcbDN15Vc5nqrUaTS9zadLda8LaoPbusSMk68MA4MIENrrhbBjMRKVSjMffL7QGWmS2LrpGxHZmU2S9FAAPQFqClQoGFOknNpjNZh55wvF0vlzXinN16T5ovUOBwUpwZti6tp3Mdhvd3v9iutrPD9ud4viCcD7bTms1kfz8d95epqt72vNetdxfbqdD-fZg+B0fHnunlvn9PD2eHm8Lu9wIA
 * https://medium.com/@bensammons/building-a-fluent-interface-with-typescript-using-generics-in-typescript-3-4d206f00dba5
 */

type FormBuilder0<T> = Omit<FormBuilderService<T extends string ? T : never>, "addInput">;

type AddInput<Builder, InputName extends string> =
    Builder extends FormBuilderService<infer InputNames>
    ? FormBuilderService<InputNames | InputName>
    : never

type CallbackKeys = "onComponentReady";

type CallbackFunction = {
    [key in CallbackKeys]: Function
}

@Injectable()
export class FormBuilderService<InputNames extends string = never> {
    public name: string;
    private currentForm: FormGroup;
    private formContainerRef: ViewContainerRef;
    private componentInputReadyCallback: CallbackFunction[] = [];

    constructor(
        private fb: FormBuilder,
        private injectComponentService: InjectComponentService) {
        this.initForm();
    }

    set form(form: FormGroup) {
        this.currentForm = form;
    }

    get form(): FormGroup {
        return this.currentForm
    }

    initForm(): FormGroup {
        this.currentForm = this.fb.group({});

        return this.form;
    }

    nameForm(name: string) {
        this.name = name;

        return this;
    }

    setViewContainerRef(containerRef: ViewContainerRef) {
        this.formContainerRef = containerRef;

        return this;
    }

    onInputReady(componentInputReadyCallback: Function) {
        this.componentInputReadyCallback.push({ onComponentReady: componentInputReadyCallback });

        return this;
    }

    addInput<InputName extends string, ReturnType extends AddInput<this, InputName>>(inputName: Exclude<InputName, InputNames>, inputLabel: string, type: InputTypes): ReturnType {
        this.currentForm.addControl(inputName, new FormControl());

        const configFieldForm: ComponentInputFormModel = { formGroup: this.currentForm, nameControl: inputName, nameLabel: inputLabel };

        const componentToAdd = this.injectComponentService.returnComponentClassFromType(type);

        this.injectComponentService.loadAndAddComponentToContainer(componentToAdd, this.formContainerRef,
            [{ config: configFieldForm }],
            this.componentInputReadyCallback
        );

        return this as FormBuilderService as ReturnType;
    }
}

// const Builder: new <T>() => FormBuilder0<T> = FormBuilderService;
